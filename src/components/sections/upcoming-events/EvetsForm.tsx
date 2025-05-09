/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Typography } from '@mui/material';
import AppForm from 'components/common/Forms/AppForm';
import AppFormTextField from 'components/common/Forms/AppTextFeild';
import { eventValidationSchema } from 'schemas/validations';
import AppFormButton from 'components/common/Forms/AppFormButton';
import AppFormTextArea from 'components/common/Forms/AppFormTextArea';
import AppFormDateTimePicker from 'components/common/Forms/AppFormDatePicker';
import { EventsFormProps, PetTypes } from 'services/pet/script';
import AppFormSelect from 'components/common/Forms/AppFormSelectFeild';
import AppFormPhoneField from 'components/common/Forms/AppPhoneFeild';
import AppFormMultiImagePicker from 'components/common/Forms/AppFormMultiImagePicker';
import { formatAddDate, formatAddTime, splitContactNumber } from 'helper/datetime';
import { useAddEventMutation, useUpdateEventMutation } from 'components/hooks/useEventsQuery';
import { uaeCities } from 'services/events/data';

interface EventsFormsProps extends EventsFormProps {
  selectedEvent?: any;
}

const EventsForm: React.FC<EventsFormsProps> = ({ isEdit, data, onSuccess, selectedEvent }) => {
  const addEvent = useAddEventMutation();
  const updateEventMutation = useUpdateEventMutation();

  const formatIfNeeded = (time: string) => {
    if (selectedEvent?.id) {
      return time.slice(0, 5);
    }
    return formatAddTime(time);
  };

  const handleSubmit = (values: any) => {
    const { phone_number, ...rest } = values;
    const { country_code, phone } = phone_number;
    const payload = {
      ...rest,
      country_code,
      city: values?.city[0],
      phone_number: phone,
      start_date: formatAddDate(values.start_date),
      end_date: formatAddDate(values.end_date),
      start_time: formatIfNeeded(values.start_time),
      end_time: formatIfNeeded(values.end_time),
    };

    if (selectedEvent?.id) {
      updateEventMutation.mutate(
        { id: selectedEvent.id, data: payload },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        },
      );
    } else {
      addEvent.mutate(payload, {
        onSuccess: () => {
          onSuccess?.();
        },
      });
    }
  };

  const full = selectedEvent?.contact_details?.contact_number!;
  const { country_code, phone_number } = splitContactNumber(full);
  return (
    <Stack width={500} flexDirection="column" p={2} overflow={'scroll'} height={600}>
      <Typography align="left" variant="h4">
        {isEdit ? 'Edit Event' : 'Add Event'}
      </Typography>
      <Stack mt={3} direction="column" gap={2}>
        <AppForm
          initialValues={{
            event_title: selectedEvent?.event_title || '',
            event_description: selectedEvent?.event_description || '',
            full_address: selectedEvent?.full_address || '',
            start_date: selectedEvent?.start_date || null,
            start_time: selectedEvent?.start_time || null,
            end_date: selectedEvent?.end_date || null,
            end_time: selectedEvent?.end_time || null,
            city: selectedEvent?.city ? [selectedEvent.city] : [],
            email: selectedEvent?.contact_details?.email || '',
            event_images: selectedEvent?.gallery_images || [],
            phone_number: { country_code: country_code, phone: phone_number },
            pin_location: selectedEvent?.pin_location || '',
            pet_types: selectedEvent?.pet_types || [],
          }}
          validationSchema={eventValidationSchema}
          onSubmit={handleSubmit}
        >
          <AppFormTextField
            name="event_title"
            label="Event Title"
            placeholder="Enter Event Title"
            icon="mdi:calendar-edit"
            variant="standard"
          />
          <AppFormSelect
            name="pet_types"
            label="Pet Type(s)"
            options={data?.map((pet: PetTypes) => ({ label: pet.label, value: pet.value }))}
            multiple
            placeholder="Select Pet Type(s)"
            icon="hugeicons:type-cursor"
            variant="standard"
            InputProps={{
              sx: { marginTop: '30px !important' },
            }}
          />
          <AppFormTextArea
            name="event_description"
            label="Event Description"
            placeholder="Enter Event Description"
            icon="mdi:calendar-text"
            variant="standard"
            rows={4}
          />
          <AppFormTextField
            name="full_address"
            label="Full Address"
            placeholder="Enter Full Address"
            icon="mdi:map-marker-outline"
            variant="standard"
          />
          <AppFormTextField
            name="pin_location"
            label="Pin Location Link"
            placeholder="Copy Here Pin Location Link"
            icon="mdi:map-marker-radius"
            variant="standard"
          />
          <AppFormSelect
            name="city"
            label="Event City"
            options={uaeCities}
            placeholder="Select Event City"
            icon="hugeicons:type-cursor"
            variant="standard"
            InputProps={{
              sx: { marginTop: '30px !important' },
            }}
          />
          <AppFormTextField
            name="email"
            label="Email"
            placeholder="Contact Email"
            icon="hugeicons:mail-at-sign-02"
            type="email"
            variant="standard"
          />
          <AppFormPhoneField name="phone_number" />
          <Stack fontSize={'13px'} fontFamily={'Plus Jakarta Sans, sans-serif'} fontWeight={400}>
            Event Images
          </Stack>
          <AppFormMultiImagePicker name="event_images" maxCount={8} itemSize={120} />
          <Stack fontSize={'13px'} fontFamily={'Plus Jakarta Sans, sans-serif'} fontWeight={400}>
            Event Timings
          </Stack>
          <AppFormDateTimePicker
            dateName="start_date"
            timeName="start_time"
            dateLabel="Start Date"
            timeLabel="Start Time"
          />
          <AppFormDateTimePicker
            dateName="end_date"
            timeName="end_time"
            dateLabel="End Date"
            timeLabel="End Time"
          />
          <AppFormButton
            isLoading={addEvent.isLoading || updateEventMutation.isLoading}
            label="Submit"
            type="submit"
            fullWidth={true}
            size="medium"
          />
        </AppForm>
      </Stack>
    </Stack>
  );
};

export default EventsForm;
