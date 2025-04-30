/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { useState } from 'react';
// import { ThreeDots } from 'react-loader-spinner';

interface UserProps {
  id?: number;
  username: string;
  email: string;
  phone_number: string;
  country_code: string;
  profile_picture?: string;
  role: string;
  profile_types: string[];
  password: string;
}

interface UserForm {
  isEdit?: boolean;
  userData?: UserProps;
}

const UserForm = ({ isEdit, userData }: UserForm) => {
  const [countryCode, setCountryCode] = useState('+1');
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<UserProps>({
    username: userData ? userData.username : '',
    email: userData ? userData.email : '',
    password: userData ? userData.password : '',
    role: userData ? userData.role : 'user',
    phone_number: userData ? userData.phone_number : '',
    country_code: userData ? userData.country_code : '',
    profile_types: userData ? userData.profile_types : [],
  });

  const profileOptions = ['Pet Shop', 'Pet Breeder', 'Pet Owner'];

  const handleSubmit = () => {};

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    if (name === 'profile_type') {
      setUser({
        ...user,
        [e.target.name]: typeof value === 'string' ? value.split(',') : (value as string[]),
      });
    }
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Stack width={500} flexDirection="column" p={4}>
      <Typography align="left" variant="h4">
        {isEdit ? 'Edit User' : 'Add User'}
      </Typography>
      <Stack component="form" mt={3} onSubmit={handleSubmit} direction="column" gap={2}>
        <TextField
          id="username"
          name="username"
          type="text"
          value={user.username}
          onChange={handleInputChange}
          variant="standard"
          placeholder="Your User Name"
          label="Username"
          fullWidth
          required
          InputProps={{
            sx: {
              marginTop: '30px !important',
            },
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="hugeicons:user" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleInputChange}
          variant="standard"
          placeholder="Your Email"
          label="Email"
          fullWidth
          required
          InputProps={{
            sx: {
              marginTop: '30px !important',
            },
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="hugeicons:mail-at-sign-02" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="phone number"
          name="phone_number"
          type="tel"
          value={user.phone_number}
          onChange={handleInputChange}
          variant="standard"
          placeholder="Your Phone Number"
          label="Phone Number"
          fullWidth
          required
          InputProps={{
            sx: {
              marginTop: '30px !important',
              paddingLeft: 0,
            },
            startAdornment: (
              <InputAdornment position="start">
                <Select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  variant="standard"
                  disableUnderline
                  autoFocus={false}
                  name="country_code"
                  sx={{ minWidth: 100, minHeight: 50, fontSize: '0.875rem', p: 0, border: 'none' }}
                >
                  <MenuItem value="+1">+971 (UAE)</MenuItem>
                  <MenuItem value="+91">+91 (IN)</MenuItem>
                  <MenuItem value="+44">+44 (UK)</MenuItem>
                  <MenuItem value="+61">+61 (AU)</MenuItem>
                </Select>

                <IconifyIcon icon="hugeicons:call" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="profile type"
          name="profile_types"
          select
          SelectProps={{
            multiple: true,
            value: user.profile_types,
            onChange: handleInputChange,
          }}
          variant="standard"
          placeholder="Select Your Profile Type"
          label="Profile Type(s)"
          fullWidth
          InputProps={{
            sx: {
              marginTop: '30px !important',
            },
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="hugeicons:type-cursor" />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem disabled selected value="">
            <p>Select Your Profile Type</p>
          </MenuItem>
          {profileOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={user.password}
          onChange={handleInputChange}
          variant="standard"
          placeholder="Your Password"
          autoComplete="current-password"
          fullWidth
          required
          label="Password"
          InputProps={{
            sx: {
              marginTop: '30px !important',
            },
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="hugeicons:lock-key" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  opacity: user.password ? 1 : 0,
                  pointerEvents: user.password ? 'auto' : 'none',
                }}
              >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{ border: 'none', bgcolor: 'transparent !important' }}
                  edge="end"
                >
                  <IconifyIcon
                    icon={showPassword ? 'fluent-mdl2:view' : 'fluent-mdl2:hide-3'}
                    color="neutral.light"
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          style={{ marginTop: '20px' }}
          type="submit"
          variant="contained"
          size="medium"
          fullWidth
          //   disabled={isLoading}
        >
          {/* {isLoading ? (
            <ThreeDots
              height="30"
              width="30"
              color="#E1801C"
              radius="9"
              ariaLabel="three-dots-loading"
            />
          ) : ( */}
          Submit
          {/* )} */}
        </Button>
      </Stack>
    </Stack>
  );
};

export default UserForm;
