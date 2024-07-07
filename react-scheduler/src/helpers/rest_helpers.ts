import { APIEventInfo, EventInfo } from "../types/EventInfo";

export const formatEventInfo = (apiData: APIEventInfo[]): EventInfo[] => {
    return apiData.map((apiEvent) => {
      return {
        ...apiEvent,
        startTime: new Date(apiEvent.startTime),
        endTime: new Date(apiEvent.endTime)
      };
    });
  };