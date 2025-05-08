import React from 'react';
import { useField } from 'formik';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconifyIcon from 'components/base/IconifyIcon';
import { Box } from '@mui/material';
import AppErrorMessage from 'components/common/Forms/AppErrorMessage';

export type PhoneValue = {
  country_code: string;
  phone: string;
};

export type AppFormPhoneFieldProps = Omit<TextFieldProps, 'onChange' | 'value'> & {
  name: string;
  defaultCountryCode?: string;
};

const AppFormPhoneField: React.FC<AppFormPhoneFieldProps> = ({
  name,
  defaultCountryCode = '+971',
  InputProps: inputProps,
  label = 'Phone Number',
  placeholder = 'Your Phone Number',
  ...textFieldProps
}) => {
  const [field, meta, helpers] = useField<string | PhoneValue>(name);

  const raw = field.value;
  const countryCode =
    typeof raw === 'object' && raw.country_code?.trim() !== ''
      ? raw.country_code
      : defaultCountryCode;
  const phoneNumber = typeof raw === 'object' ? raw.phone : raw || '';

  const showError = Boolean(meta.touched && meta.error);

  const setCombined = (code: string, phone: string) => {
    helpers.setValue({ country_code: code, phone });
  };

  return (
    <Box mb="10px">
      <TextField
        name={name}
        id={name}
        type="tel"
        variant="standard"
        fullWidth
        label={label}
        placeholder={placeholder}
        error={showError}
        value={phoneNumber}
        onChange={(e) => setCombined(countryCode, e.target.value)}
        onBlur={field.onBlur}
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
                value={countryCode}
                onChange={(e) => setCombined(e.target.value, phoneNumber)}
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
        {...textFieldProps}
      />
      <AppErrorMessage error={String(meta.error || '')} visible={showError} />
    </Box>
  );
};

export default AppFormPhoneField;
