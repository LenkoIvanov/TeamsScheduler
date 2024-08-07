import { z } from 'zod';

export const MSGraphEventShema = z.object({
  id: z.string(),
  subject: z.string(),
  start: z.object({
    dateTime: z.string(),
    timeZone: z.string().includes('FLE Standard Time')
  }),
  end: z.object({
    dateTime: z.string(),
    timeZone: z.string().includes('FLE Standard Time')
  }),
  organizer: z.object({
    emailAddress: z.object({
      name: z.string()
    })
  }),
  // The Microsoft response for the 'start' and 'end' time fields differs from this one, there 'timeZone' field exists.
  // Here ZonedDateTime is provided ('2000-01-01T11:00:00.0000000Z'), which consists of exactly 27 characters, when no
  // TimeZone was added ('2000-01-01T11:00:00.0000000+02:00').
  createdDateTime: z.string().min(27)
});

export const MSGraphEventArrayShema = z.array(MSGraphEventShema);

export type MSGraphEvent = z.infer<typeof MSGraphEventShema>;

export interface MicrosoftMeetingModel {
  id: string;
  subject: string;
  startTime: string;
  endTime: string;
  organizer: string;
}
