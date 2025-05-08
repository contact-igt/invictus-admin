/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Typography } from '@mui/material';
import AppForm from 'components/common/Forms/AppForm';
import AppFormSelect from 'components/common/Forms/AppFormSelectFeild';
import AppFormPhoneField from 'components/common/Forms/AppPhoneFeild';
import AppFormTextField from 'components/common/Forms/AppTextFeild';
import { userAddValidationSchema } from 'schemas/validations';
import type { UserForm, UserProps } from './userTypes';
import AppFormButton from 'components/common/Forms/AppFormButton';

const UserForm = ({ isEdit, userData }: UserForm) => {
  const profileOptions = [
    { label: 'Pet Shop', value: 'pet_shop' },
    { label: 'Pet Breeder', value: 'pet_breeder' },
    { label: 'Pet Owner', value: 'pet_owner' },
  ];

  const handleSubmit = (values: UserProps) => {
    console.log('Form Values:', values);
  };
  return (
    <Stack width={500} flexDirection="column" p={2}>
      <Typography align="left" variant="h4">
        {isEdit ? 'Edit User' : 'Add User'}
      </Typography>
      <Stack mt={3} direction="column" gap={2}>
        <AppForm
          initialValues={{
            username: userData?.username || '',
            email: userData?.email || '',
            password: userData?.password || '',
            phone_number: {
              country_code: userData?.country_code || '',
              phone: userData?.phone_number || '',
            },
            profile_types: userData?.profile_types || [],
          }}
          validationSchema={userAddValidationSchema}
          onSubmit={handleSubmit}
        >
          <AppFormTextField
            name="username"
            label="Username"
            placeholder="Your User Name"
            icon="hugeicons:user"
            variant="standard"
          />
          <AppFormTextField
            name="email"
            label="Email"
            placeholder="Your Email"
            icon="hugeicons:mail-at-sign-02"
            type="email"
            variant="standard"
          />

          <AppFormPhoneField name="phone_number" />

          <AppFormSelect
            name="profile_types"
            label="Profile Type(s)"
            options={profileOptions}
            multiple
            placeholder="Select Profile Type(s)"
            icon="hugeicons:type-cursor"
            variant="standard"
            InputProps={{
              sx: { marginTop: '30px !important' },
            }}
          />

          <AppFormTextField
            name="password"
            label="Password"
            placeholder="Your Password"
            icon="hugeicons:lock-key"
            type="password"
            autoComplete="current-password"
            variant="standard"
            InputProps={{
              sx: { marginTop: '30px !important' },
            }}
          />

          <AppFormButton label="Submit" type="submit" fullWidth={true} size="medium" />
        </AppForm>
      </Stack>
    </Stack>
  );
};

export default UserForm;
