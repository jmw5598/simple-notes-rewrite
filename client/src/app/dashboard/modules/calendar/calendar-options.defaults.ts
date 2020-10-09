import { CalendarOptions } from '@fullcalendar/angular';

// TODO define colors? Enum?
const TEXT_COLOR_DEFAULT: string = '#FFFFFF';
const BORDER_COLOR_DEFAULT: string = '#127ba3';
const BACKGROUND_COLOR_DEFAULT: string = '#158cba'

export const CALENDAR_OPTIONS_DEFAULT: CalendarOptions = {
  initialView: 'dayGridMonth',
  themeSystem: 'bootstrap',
  buttonText: {
    next: 'Next',
    prev: 'Prev'
  },
  eventSources: [
  ],
  eventBackgroundColor: BACKGROUND_COLOR_DEFAULT,
  eventBorderColor: BORDER_COLOR_DEFAULT,
  eventTextColor: TEXT_COLOR_DEFAULT
};