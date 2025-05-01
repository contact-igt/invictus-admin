/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from 'react-query';
import { AuthApis } from '../../../services/auth';
import { User } from '../../../services/auth/script';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthData } from 'redux/slices/auth/authSlice';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';

const { login } = new AuthApis();

export const useLoginMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (data: User) => login(data),
    onSuccess: (data) => {
      if (!data || data.success === false) {
        enqueueSnackbar(data?.message || 'Login failed', { variant: 'error' });
        return;
      }

      enqueueSnackbar('Login successful', { variant: 'success' });
      dispatch(
        setAuthData({
          token: data.accessToken,
          refreshToken: data.refreshToken,
          user: data.user,
        }),
      );
      navigate('/');
    },
    onError: (error) => {
      const err = error as AxiosError<any>;
      enqueueSnackbar(err.response?.data?.message || 'Something went wrong', {
        variant: 'error',
      });
    },
  });
};
