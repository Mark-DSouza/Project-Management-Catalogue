export const MILLISECONDS_IN_SECOND = 1000;

export const SECONDS_IN_MINUTE = 60;

export const MINUTES_IN_HOUR = 60;

export const HOURS_IN_DAY = 24;

export const DAYS_IN_WEEK = 7;

export const MILLISECONDS_IN_MINUTE =
  SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;

export const MILLISECONDS_IN_HOUR = MINUTES_IN_HOUR * MILLISECONDS_IN_MINUTE;

export const MILLISECONDS_IN_DAY = HOURS_IN_DAY * MILLISECONDS_IN_HOUR;

export const MILLISECONDS_IN_WEEK = DAYS_IN_WEEK * MILLISECONDS_IN_DAY;

export const millisecondsToSeconds = (milliseconds: number) =>
  Math.floor(milliseconds / MILLISECONDS_IN_SECOND);

export const millisecondsToMinutes = (milliseconds: number) =>
  Math.floor(milliseconds / MILLISECONDS_IN_MINUTE);

export const millisecondsToHours = (milliseconds: number) =>
  Math.floor(milliseconds / MILLISECONDS_IN_HOUR);

export const millisecondsToDays = (milliseconds: number) =>
  Math.floor(milliseconds / MILLISECONDS_IN_DAY);

export const millisecondsToWeeks = (milliseconds: number) =>
  Math.floor(milliseconds / MILLISECONDS_IN_WEEK);
