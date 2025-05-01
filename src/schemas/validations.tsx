import * as Yup from 'yup';

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
