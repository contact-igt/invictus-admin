import { useMutation } from 'react-query';
import { AuthApis } from '../../../services/auth';
import { User } from '../../../services/auth/script';

const { login } = new AuthApis();

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: User) => login(data),
    onSuccess: () => {
      // console.log('Login success:', data);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error('Login error:', error);
    },
  });
};