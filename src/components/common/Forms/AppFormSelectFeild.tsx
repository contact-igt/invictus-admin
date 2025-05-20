import React from 'react';
import { useField, useFormikContext, FormikValues } from 'formik';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import IconifyIcon from 'components/base/IconifyIcon';
import { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import AppErrorMessage from 'components/common/Forms/AppErrorMessage';

export type Option = {
  value: string;
  label: string;
};

export type AppFormSelectProps = Omit<TextFieldProps, 'select' | 'children' | 'onChange' | 'value'> & {
  name: string;
  options: Option[];
  icon?: string;
  multiple?: boolean;
  placeholder?: string;
  onValueChange?: (value: string | string[]) => void;
};

export const AppFormSelect: React.FC<AppFormSelectProps> = ({
  name,
  options = [],
  icon,
  multiple = false,
  placeholder = 'Select an option',
  InputProps: inputProps,
  onValueChange,
  ...textFieldProps
  
}) => {
  const { touched, errors, setFieldValue } = useFormikContext<FormikValues>();
  const [field] = useField(name);
  const showError = !!(touched[name] && errors[name]);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const selectedValue = event.target.value;

    if (multiple) {
      setFieldValue(name, selectedValue);
      onValueChange?.(selectedValue as string[]);
    } else {
      onValueChange?.([selectedValue as string]);
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
                  .map((val) => options?.find((opt) => opt.value === val)?.label)
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
        {options?.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>
      <AppErrorMessage error={String(errors[name] || '')} visible={showError} />
    </Box>
  );
};

export default AppFormSelect;
