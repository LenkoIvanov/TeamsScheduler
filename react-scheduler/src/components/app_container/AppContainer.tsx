import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InfoSection } from "../info_section/InfoSection";
import { RoomStatus } from "../room_status/RoomStatus";
import { Scheduler } from "../scheduler/scheduler_component/Scheduler";
import styles from "./AppContainer.module.scss";
import { createNewEvent, fetchEvents } from "../../api/http/rest";
import { useEffect, useState } from "react";
import { EventInfo } from "../../types/EventInfo";
import {
  getOngoingEventIdx,
  handleTimeUntilFree,
} from "../../helpers/room_status_helper";
import { NewMeetingModal } from "../modals/new_meeting_modal/NewMeetingModal";
import { oneMinuteInMiliseconds } from "../../helpers/constants";

export const AppContainer = () => {
  const [currentEvent, setCurrentEvent] = useState<EventInfo | null>(null);
  const [currentMoment, setCurrentMoment] = useState<Date>(new Date());
  const [showNewMeetignModal, setShowNewMeetingModal] = useState(false);
  const [isMutationLoading, setIsMutationLoading] = useState<boolean>(false);
  const [isMutationError, setIsMutationError] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const eventsQueryKey = "events";

  const { data, status } = useQuery({
    queryKey: [eventsQueryKey],
    queryFn: fetchEvents,
    refetchInterval: oneMinuteInMiliseconds,
    retry: 1,
  });

  const { mutate } = useMutation({
    onMutate: () => {
      setIsMutationLoading(true);
      setShowNewMeetingModal(false);
      if (isMutationError) setIsMutationError(false);
    },
    mutationFn: (minutes: number) => createNewEvent(minutes),
    onSuccess: () => {
      invalidateFetchedEvents();
    },
    onError: () => {
      setIsMutationError(true);
    },
    onSettled: () => setIsMutationLoading(false),
  });

  const isLoadingState = isMutationLoading || status === "pending";
  const isErrorState = isMutationError || status === "error";

  const invalidateFetchedEvents = () => {
    queryClient.invalidateQueries({ queryKey: [eventsQueryKey] });
  };

  setInterval(() => {
    const newMoment = new Date();
    if (currentEvent) {
      const timeUntilCurrentEventFinale = handleTimeUntilFree(
        currentEvent,
        newMoment
      );
      if (timeUntilCurrentEventFinale.minutesUntilFree === 0)
        setCurrentEvent(null);
    }
    setCurrentMoment(newMoment);
  }, 15000);

  useEffect(() => {
    if (currentEvent || !data) return;
    const currentEventIdx = getOngoingEventIdx(data);
    if (currentEventIdx !== -1) setCurrentEvent(data[currentEventIdx]);
  }, [currentEvent, data]);

  return (
    <>
      {showNewMeetignModal && (
        <NewMeetingModal
          handleModalClose={() => setShowNewMeetingModal(false)}
          createRoomEvent={mutate}
        />
      )}
      <div className={styles.appContainer}>
        <RoomStatus
          events={data || []}
          currentEvent={currentEvent}
          currentMoment={currentMoment}
          isError={isErrorState}
          isLoading={isLoadingState}
        />
        <InfoSection
          currentEvent={currentEvent}
          events={data || []}
          roomName={import.meta.env.VITE_ROOM_NAME.toUpperCase()}
          isError={isErrorState}
          isLoading={isLoadingState}
          onCreateBtnClick={() => setShowNewMeetingModal(true)}
        />
        <Scheduler events={data || []} />
      </div>
    </>
  );
};
