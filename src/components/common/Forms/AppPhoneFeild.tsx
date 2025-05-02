import React from 'react';
import { useField } from 'formik';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconifyIcon from 'components/base/IconifyIcon';
import { Box } from '@mui/material';
import AppErrorMessage from 'components/common/Forms/AppErrorMessage';

export type AppFormPhoneFieldProps = Omit<TextFieldProps, 'onChange' | 'value'> & {
  countryCodeField?: string;
};

const AppFormPhoneField: React.FC<AppFormPhoneFieldProps> = ({
  name,
  countryCodeField = 'country_code',
  InputProps: inputProps,
  label = 'Phone Number',
  placeholder = 'Your Phone Number',
  ...textFieldProps
}) => {
  const [phoneField, phoneMeta] = useField<string>(name || 'defaultFieldName');
  const [codeField, , codeHelpers] = useField<string>(countryCodeField);

  const showError = Boolean(phoneMeta.touched && phoneMeta.error);

  return (
    <Box mb="10px">
      <TextField
        {...phoneField}
        {...textFieldProps}
        name={phoneField.name}
        id={phoneField.name}
        type="tel"
        variant="standard"
        fullWidth
        label={label}
        placeholder={placeholder}
        error={showError}
        InputProps={{
          ...inputProps,
          sx: {
            marginTop: '30px !important',
            paddingLeft: 0,
            ...(inputProps?.sx || {}),
          },
          startAdornment: (
            <InputAdornment position="start">
              <Select
                value={codeField.value || '+971'}
                onChange={(e) => codeHelpers.setValue(e.target.value)}
                variant="standard"
                disableUnderline
                sx={{
                  minWidth: 100,
                  minHeight: 50,
                  fontSize: '0.875rem',
                  p: 0,
                  border: 'none',
                }}
              >
                <MenuItem value="+971">+971 (UAE)</MenuItem>
                <MenuItem value="+1">+1 (USA)</MenuItem>
              </Select>
              <IconifyIcon icon="hugeicons:call" />
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          style: { color: 'inherit' },
        }}
      />
      <AppErrorMessage error={String(phoneMeta.error || '')} visible={showError} />
    </Box>
  );
};

export default AppFormPhoneField;
