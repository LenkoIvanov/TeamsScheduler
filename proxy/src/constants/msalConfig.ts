import { ClientCredentialRequest } from '@azure/msal-node';

export const accessTokenRequest: ClientCredentialRequest = {
  scopes: ['https://graph.microsoft.com/.default']
};

export const fetchCreateRoomEventURL = (roomName: string) =>
  `https://graph.microsoft.com/v1.0/users/${roomName}@blubito.com/calendar/events`;

export const fetchGetRoomEventsURL = (roomName: string) =>
  `https://graph.microsoft.com/v1.0/users/${roomName}@blubito.com/calendar/`;

export const fetchDeleteRoomEventsURL = (roomName: string, roomMeetingId: string) =>
  `https://graph.microsoft.com/v1.0/users/${roomName}@blubito.com/calendar/events/${roomMeetingId}`;

export const fetchGetOneRoomEventURL = (roomName: string, roomMeetingId: string) =>
  `https://graph.microsoft.com/v1.0/users/${roomName}@blubito.com/calendar/events/${roomMeetingId}`;
