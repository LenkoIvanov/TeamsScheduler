import { ClientCredentialRequest } from '@azure/msal-node';

export const accessTokenRequest: ClientCredentialRequest = {
  scopes: ['https://graph.microsoft.com/.default']
};

const roomName = process.env.ROOM_NAME ?? "";

export const fetchCreateRoomEventURL = () =>
  `https://graph.microsoft.com/v1.0/users/${roomName}/calendar/events`;

export const fetchGetRoomEventsURL = () =>
  `https://graph.microsoft.com/v1.0/users/${roomName}/calendar/`;