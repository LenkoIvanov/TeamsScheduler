import { add, format } from "date-fns";
import { EventInfo } from "../../types/EventInfo";

// export const fetchTeamsEvents = async () => {
//   const eventData = await axiosInstance.get(fetchEventsURL);
//   return eventData.data;
// };

export let TestData: EventInfo[] = [
  {
    subject: "Test 1",
    organizer: "Conference room",
    startTime: new Date("Sat Jun 08 2024 09:00:00"),
    endTime: new Date("Sat Jun 08 2024 09:30:00"),
  },
  {
    subject: "Test 2",
    organizer: "Conference room",
    startTime: new Date("Sat Jun 08 2024 09:50:00"),
    endTime: new Date("Sat Jun 08 2024 10:05:00"),
  },
  {
    subject: "Test 3",
    organizer: "Conference room",
    startTime: new Date("Sat Jun 08 2024 11:00:00"),
    endTime: new Date("Sat Jun 08 2024 11:30:00"),
  },
  {
    subject: "Test 4",
    organizer: "Conference room",
    startTime: new Date("Sat Jun 08 2024 11:15:00"),
    endTime: new Date("Sat Jun 08 2024 12:00:00"),
  },
  {
    subject: "Test 5",
    organizer: "Conference room",
    startTime: new Date("Sat Jun 08 2024 11:30:00"),
    endTime: new Date("Sat Jun 08 2024 12:30:00"),
  },
  {
    subject: "Test 6",
    organizer: "Conference room",
    startTime: new Date("Sat Jun 08 2024 12:05:00"),
    endTime: new Date("Sat Jun 08 2024 12:30:00"),
  },
  {
    subject: "Test 7",
    organizer: "Conference room",
    startTime: new Date("Sat Jun 08 2024 15:05:00"),
    endTime: new Date("Sat Jun 08 2024 15:50:00"),
  },
  {
    subject: "Test 8",
    organizer: "Conference room",
    startTime: new Date("Sat Jun 08 2024 15:00:00"),
    endTime: new Date("Sat Jun 08 2024 16:00:00"),
  },
  {
    subject: "Test 9",
    organizer: "Conference room",
    startTime: new Date("Sat Jun 08 2024 16:30:00"),
    endTime: new Date("Sat Jun 08 2024 17:30:00"),
  },
];

export const fetchTeamsEvents = (): Promise<EventInfo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(TestData);
    }, 5000);
  });
};

export const createNewEvent = (eventDuration: number): Promise<boolean> => {
  const startTime = new Date();
  const endTime = add(startTime, { minutes: eventDuration });

  const computedStartTime = new Date(
    format(startTime, "yyyy-MM-dd'T'HH:mm:ss")
  );
  const computedEndTime = new Date(format(endTime, "yyyy-MM-dd'T'HH:mm:ss"));

  const newEvent: EventInfo = {
    organizer: "Conference room",
    subject: "Custom event",
    startTime: computedStartTime,
    endTime: computedEndTime,
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      const newData = [...TestData, newEvent];
      TestData = newData;
      resolve(true);
    }, 3000);
  });
};
