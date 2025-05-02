import * as Yup from 'yup';
import dayjs from 'dayjs';

export const userAddValidationSchema = Yup.object({
  username: Yup.string().required('Username is required').label('Username'),
  email: Yup.string().email('Invalid email').required('Email is required').label('Email'),
  profile_types: Yup.array()
    .of(Yup.string())
    .min(1, 'Select at least one profile type')
    .label('Profile Type(s)'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
    .label('Password'),
  phone_number: Yup.string()
    .required('Phone number is required')
    .min(7, 'Phone number must be at least 7 characters')
    .matches(/^[0-9]+$/, 'Phone number must contain only digits')
    .label('Phone Number'),
});

export const eventValidationSchema = Yup.object()
  .shape({
    event_title: Yup.string()
      .required('Event title is required')
      .min(10, 'Event title must be at least 10 characters')
      .max(100, 'Event title must be at most 100 characters'),

    event_description: Yup.string()
      .required('Event description is required')
      .min(30, 'Event description must be at least 30 characters')
      .max(1000, 'Event description must be at most 1000 characters'),

    full_address: Yup.string()
      .required('Full address is required')
      .max(255, 'Address must be at most 255 characters'),

    pet_types: Yup.array()
      .of(Yup.string().required())
      .min(1, 'Please select at least one pet type')
      .required('Pet types are required'),

    pin_location: Yup.string().required('Location link is required').url('Enter a valid URL'),

    start_date: Yup.date()
      .required('Start date is required')
      .min(dayjs().startOf('day').toDate(), 'Start date cannot be in the past'),

    start_time: Yup.string().required('Start time is required'),

    end_date: Yup.date()
      .required('End date is required')
      .min(Yup.ref('start_date'), 'End date cannot be before start date'),

    end_time: Yup.string().required('End time is required'),
  })
  .test(
    'start_end_datetime',
    'End date and time must be the same or after the start date and time',
    function (values) {
      const { start_date, start_time, end_date, end_time } = values;

      if (!start_date || !start_time || !end_date || !end_time) {
        return true;
      }

      const s = dayjs(start_date).hour(dayjs(start_time).hour()).minute(dayjs(start_time).minute());
      const e = dayjs(end_date).hour(dayjs(end_time).hour()).minute(dayjs(end_time).minute());

      return e.isSame(s) || e.isAfter(s);
    },
  );
