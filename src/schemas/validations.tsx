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

export const eventValidationSchema = Yup.object({
  event_title: Yup.string()
    .required('Event title is required')
    .min(10, 'Event title must be at least 10 characters')
    .max(100, 'Event title must be at most 100 characters')
    .label('Event Title'),

  event_description: Yup.string()
    .required('Event description is required')
    .min(30, 'Event description must be at least 30 characters')
    .max(1000, 'Event description must be at most 1000 characters')
    .label('Event Description'),

  full_address: Yup.string()
    .required('Full address is required')
    .max(255, 'Address must be at most 255 characters'),

  start_date_time: Yup.date()
    .required('Start date & time is required')
    .min(dayjs().toDate(), 'Start date & time must be in the future'),

  end_date_time: Yup.date()
    .required('End date & time is required')
    .min(Yup.ref('start_date_time'), 'End date & time cannot be before start date & time'),

  // pin_location: Yup.string()
  //   .required('Location link is required')
  //   .url('Enter a valid URL'),
});
