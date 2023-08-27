export class TimeHelper {
  static MILLISECONDS_IN_SECOND = 1000;

  static SECONDS_IN_MINUTE = 60;

  static MINUTES_IN_HOUR = 60;

  static HOURS_IN_DAY = 24;

  static DAYS_IN_WEEK = 7;

  static MILLISECONDS_IN_MINUTE =
    TimeHelper.SECONDS_IN_MINUTE * TimeHelper.MILLISECONDS_IN_SECOND;

  static MILLISECONDS_IN_HOUR =
    TimeHelper.MINUTES_IN_HOUR * TimeHelper.MILLISECONDS_IN_MINUTE;

  static MILLISECONDS_IN_DAY =
    TimeHelper.HOURS_IN_DAY * TimeHelper.MILLISECONDS_IN_HOUR;

  static MILLISECONDS_IN_WEEK =
    TimeHelper.DAYS_IN_WEEK * TimeHelper.MILLISECONDS_IN_DAY;

  static millisecondsToSeconds = (milliseconds: number) =>
    Math.floor(milliseconds / TimeHelper.MILLISECONDS_IN_SECOND);

  static millisecondsToMinutes = (milliseconds: number) =>
    Math.floor(milliseconds / TimeHelper.MILLISECONDS_IN_MINUTE);

  static millisecondsToHours = (milliseconds: number) =>
    Math.floor(milliseconds / TimeHelper.MILLISECONDS_IN_HOUR);

  static millisecondsToDays = (milliseconds: number) =>
    Math.floor(milliseconds / TimeHelper.MILLISECONDS_IN_DAY);

  static millisecondsToWeeks = (milliseconds: number) =>
    Math.floor(milliseconds / TimeHelper.MILLISECONDS_IN_WEEK);
}
