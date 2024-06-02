export interface GraphEventInfo {
  subject: string;
  organizer: string;
  startTime: string;
  endTime: string;
}

export interface EventInfo {
  subject: string;
  organizer: string;
  startTime: Date;
  endTime: Date;
}
