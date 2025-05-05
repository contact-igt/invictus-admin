import { Stack, Typography } from '@mui/material';
import AppFormButton from './Forms/AppFormButton';
import Remove from "assets/images/remove.svg"

interface ConfirmAlertProps {
  title: string;
  message: string;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmAlert = ({ title, isLoading, onConfirm, onCancel }: ConfirmAlertProps) => {
  return (
    <Stack
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems="center"
      spacing={2}
      sx={{ padding: 4 }}
    >
      <img
          src={Remove}
          alt="Restricted Device"
          style={{ width: '350px', marginBottom: '1.5rem' }}
        />
     <Typography textAlign={'center'} variant="h4" sx={{width: '100%', maxWidth: "300px"}}>
        {title}
      </Typography>
      {/* <Typography variant="subtitle2">
        {message}
      </Typography> */}
      <Stack direction="row" spacing={3}>
        <AppFormButton
          label="Confirm"
          size="medium"
          fullWidth={true}
          onClick={onConfirm}
          isLoading={isLoading}
          bg="#CC3300"
        />
        <AppFormButton label="Cancel" size="medium" onClick={onCancel} fullWidth={true}/>
      </Stack>
    </Stack>
  );
};
export default ConfirmAlert;
