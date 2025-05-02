import React from 'react';
import { useField, useFormikContext, FormikValues } from 'formik';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import IconifyIcon from 'components/base/IconifyIcon';
import { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import AppErrorMessage from 'components/common/Forms/AppErrorMessage';

export type Option = {
  value: string;
  label: string;
};

export type AppFormSelectProps = Omit<
  TextFieldProps,
  'select' | 'children' | 'onChange' | 'value'
> & {
  name: string;
  options: Option[];
  icon?: string;
  multiple?: boolean;
  placeholder?: string;
};

export const AppFormSelect: React.FC<AppFormSelectProps> = ({
  name,
  options,
  icon,
  multiple = false,
  placeholder = 'Select an option',
  InputProps: inputProps,
  ...textFieldProps
}) => {
  const { touched, errors, setFieldValue } = useFormikContext<FormikValues>();
  const [field] = useField(name);
  const showError = !!(touched[name] && errors[name]);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const selectedValue = event.target.value;

    if (multiple) {
      setFieldValue(name, selectedValue);
    } else {
      setFieldValue(name, [selectedValue]);
    }
  };

  const value = multiple ? (Array.isArray(field.value) ? field.value : []) : field.value || [];

  return (
    <Box mb="10px">
      <TextField
        {...textFieldProps}
        select
        name={name}
        id={name}
        fullWidth
        error={showError}
        helperText={null}
        InputProps={{
          ...inputProps,
          startAdornment: icon ? (
            <InputAdornment position="start">
              <IconifyIcon icon={icon} />
            </InputAdornment>
          ) : (
            inputProps?.startAdornment
          ),
          sx: {
            marginTop: '30px !important',
            ...(inputProps?.sx || {}),
          },
        }}
        SelectProps={{
          multiple,
          value,
          onChange: handleChange,
          displayEmpty: true,
          renderValue: (selected: unknown) => {
            if (Array.isArray(selected) && selected.length === 0) {
              return placeholder;
            }
            return Array.isArray(selected)
              ? (selected as string[])
                  .map((val) => options.find((opt) => opt.value === val)?.label)
                  .filter(Boolean)
                  .join(', ')
              : String(selected);
          },
          ...(textFieldProps.SelectProps || {}),
        }}
        InputLabelProps={{
          style: { color: 'inherit' },
        }}
      >
        {multiple && !field.value?.length && (
          <MenuItem disabled value="">
            {placeholder}
          </MenuItem>
        )}
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>
      <AppErrorMessage error={String(errors[name] || '')} visible={showError} />
    </Box>
  );
};

export const AppFormPhoneInput: React.FC<
  TextFieldProps & {
    name: string;
    icon?: string;
    countryCode: string;
    onCountryCodeChange: (value: string) => void;
    countryOptions: Option[];
  }
> = ({
  name,
  icon = 'hugeicons:call',
  countryCode,
  onCountryCodeChange,
  countryOptions,
  InputProps: inputProps,
  ...textFieldProps
}) => {
  const { touched, errors } = useFormikContext<FormikValues>();
  const [field] = useField(name);
  const showError = !!(touched[name] && errors[name]);

  return (
    <Box mb="10px">
      <TextField
        {...field}
        {...textFieldProps}
        id={name}
        name={name}
        fullWidth
        error={showError}
        helperText={null}
        InputProps={{
          ...inputProps,
          startAdornment: (
            <InputAdornment position="start">
              <Select
                value={countryCode}
                onChange={(e) => onCountryCodeChange(e.target.value)}
                variant="standard"
                disableUnderline
                name="country_code"
                sx={{
                  minWidth: 100,
                  minHeight: 50,
                  fontSize: '0.875rem',
                  p: 0,
                  border: 'none',
                }}
              >
                {countryOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <IconifyIcon icon={icon} />
            </InputAdornment>
          ),
          sx: {
            marginTop: '30px !important',
            paddingLeft: 0,
            ...(inputProps?.sx || {}),
          },
        }}
      />
      <AppErrorMessage error={String(errors[name] || '')} visible={showError} />
    </Box>
  );
};

export default AppFormSelect;
