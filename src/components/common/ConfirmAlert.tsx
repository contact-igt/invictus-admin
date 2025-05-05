import { Stack } from '@mui/material';
import AppFormButton from './Forms/AppFormButton';

interface ConfirmAlertProps {
  title: string;
  message: string;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmAlert = ({ title, message, isLoading, onConfirm, onCancel }: ConfirmAlertProps) => {
  return (
    <Stack
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems="center"
      spacing={2}
      sx={{ padding: 4 }}
    >
      <h2>{title}</h2>
      <p>{message}</p>
      <Stack direction="row" spacing={2}>
        <AppFormButton
          label="Confirm"
          size="medium"
          onClick={onConfirm}
          isLoading={isLoading}
          bg="#CC3300"
        />
        <AppFormButton label="Cancel" size="medium" onClick={onCancel} />
      </Stack>
    </Stack>
  );
};
export default ConfirmAlert;
