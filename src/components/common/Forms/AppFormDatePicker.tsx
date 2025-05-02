import React from 'react';
import { useFormikContext, FormikValues } from 'formik';
import Box from '@mui/material/Box';
import { DatePicker, TimePicker, DateTimePicker } from '@mui/x-date-pickers';
import AppErrorMessage from 'components/common/Forms/AppErrorMessage';

type MuiDatePickerProps = Omit<React.ComponentProps<typeof DatePicker>, 'value' | 'onChange'>;
type MuiTimePickerProps = Omit<React.ComponentProps<typeof TimePicker>, 'value' | 'onChange'>;
type MuiDateTimePickerProps = Omit<
  React.ComponentProps<typeof DateTimePicker>,
  'value' | 'onChange'
>;

export interface AppFormDateTimePickerProps {
  dateName: string;
  timeName?: string;
  showDate?: boolean;
  showTime?: boolean;
  dateLabel?: string;
  timeLabel?: string;
  datePickerProps?: MuiDatePickerProps | MuiDateTimePickerProps;
  timePickerProps?: MuiTimePickerProps;
}

const AppFormDateTimePicker: React.FC<AppFormDateTimePickerProps> = ({
  dateName,
  timeName,
  showDate = true,
  showTime = true,
  dateLabel,
  timeLabel,
  datePickerProps,
  timePickerProps,
}) => {
  const { values, touched, errors, setFieldValue } = useFormikContext<FormikValues>();

  const dateValue = values[dateName] ?? null;
  const timeValue = timeName ? values[timeName] ?? null : null;

  const dateError = touched[dateName] && errors[dateName] ? String(errors[dateName]) : '';
  const timeError =
    timeName && touched[timeName] && errors[timeName] ? String(errors[timeName]) : '';
  const showDateTime = showDate && showTime && !timeName;

  return (
    <Box display="flex" mb="10px" mt="10px" gap={2}>
      {showDateTime ? (
        <Box flex={1}>
          <DateTimePicker
            label={dateLabel || 'Date & Time'}
            value={dateValue}
            onChange={(newVal) => setFieldValue(dateName, newVal)}
            slotProps={{
              textField: {
                fullWidth: true,
                error: false,
                helperText: null,
                sx: {
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: 'none',
                    },
                  },
                  '& .MuiInputBase-input': {
                    height: '30px',
                  },
                },
              },
            }}
            {...(datePickerProps as MuiDateTimePickerProps)}
          />
          {dateError && <AppErrorMessage error={dateError} visible={Boolean(dateError)} />}
        </Box>
      ) : (
        <>
          {showDate && (
            <Box flex={1}>
              <DatePicker
                label={dateLabel || 'Date'}
                value={dateValue}
                onChange={(newVal) => setFieldValue(dateName, newVal)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: false,
                    helperText: null,
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          border: 'none',
                        },
                        '&:hover fieldset': {
                          border: 'none',
                        },
                        '&.Mui-focused fieldset': {
                          border: 'none',
                        },
                      },
                      '& .MuiInputBase-input': {
                        height: '30px',
                      },
                    },
                  },
                }}
                {...(datePickerProps as MuiDatePickerProps)}
              />
              {dateError && <AppErrorMessage error={dateError} visible={Boolean(dateError)} />}
            </Box>
          )}
          {showTime && timeName && (
            <Box flex={1}>
              <TimePicker
                label={timeLabel || 'Time'}
                value={timeValue}
                onChange={(newVal) => setFieldValue(timeName, newVal)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: false,
                    helperText: null,
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          border: 'none',
                        },
                        '&:hover fieldset': {
                          border: 'none',
                        },
                        '&.Mui-focused fieldset': {
                          border: 'none',
                        },
                      },
                      '& .MuiInputBase-input': {
                        height: '30px',
                      },
                    },
                  },
                }}
                {...timePickerProps}
              />
              {timeError && <AppErrorMessage error={timeError} visible={Boolean(timeError)} />}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default AppFormDateTimePicker;
