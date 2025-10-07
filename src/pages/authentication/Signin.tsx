import { useState, ChangeEvent, FormEvent } from 'react';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import IconifyIcon from 'components/base/IconifyIcon';
import Image from 'components/base/Image';
import LogoImg from '/assets/brand-logo.png';
import { useLoginMutation } from './hooks/useLogin';
import { User } from '../../services/auth/script';
import { ThreeDots } from 'react-loader-spinner';

const Signin = () => {
  const { mutate, isLoading } = useLoginMutation();
  const [user, setUser] = useState<User>({ email: '', password: '', role: 'admin' });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(user);
  };

  return (
    <>
      <Stack
        top={0}
        pt={1}
        pb={2.5}
        justifyContent="center"
        alignItems="center"
        bgcolor="info.lighter"
        zIndex={1000}
      >
        <Image src={LogoImg} alt="logo" height={50} width={200} sx={{ mr: 1.25 }} />
      </Stack>
      <Typography align="center" variant="h4">
        Sign In
      </Typography>
      <Typography mt={1.5} mb={4} align="center" variant="body2">
        Welcome back! Let's continue with,
      </Typography>

      <Stack component="form" mt={3} onSubmit={handleSubmit} direction="column" gap={2}>
        <TextField
          id="email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleInputChange}
          variant="standard"
          placeholder="Your Email"
          autoComplete="email"
          label="Email"
          fullWidth
          autoFocus
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

        <Stack mt={2} mb={4} alignItems="center" justifyContent="space-between">
          <FormControlLabel
            control={<Checkbox id="checkbox" name="checkbox" size="small" color="primary" />}
            label="Remember me"
            sx={{ ml: -1 }}
          />
          <Link href="#!" fontSize="body2.fontSize">
            Forgot password?
          </Link>
        </Stack>

        <Button
          style={{ marginBottom: '20px' }}
          type="submit"
          variant="contained"
          size="medium"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? (
            <ThreeDots
              height="30"
              width="30"
              color="#E1801C"
              radius="9"
              ariaLabel="three-dots-loading"
            />
          ) : (
            'Sign In'
          )}
        </Button>
      </Stack>
    </>
  );
};

export default Signin;
