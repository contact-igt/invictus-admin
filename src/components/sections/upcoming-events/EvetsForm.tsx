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

const EventsForm: React.FC<EventsFormProps> = ({ isEdit, data }) => {
  const handleSubmit = (values: any) => {
    console.log('Form Values:', values);
  };
 
  return (
    <Stack width={500} flexDirection="column" p={2} overflow={'scroll'} height={600}>
      <Typography align="left" variant="h4">
        {isEdit ? 'Edit Event' : 'Add Event'}
      </Typography>
      <Stack mt={3} direction="column" gap={2}>
        <AppForm
          initialValues={{
            event_title: '',
            event_description: '',
            full_address: '',
            start_date: null,
            start_time: null,
            end_date: null,
            end_time: null,
            pin_location: '',
            pet_types: [],
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
          <Stack fontSize={"13px"} fontFamily={'Plus Jakarta Sans, sans-serif'} fontWeight={400}>
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

          <AppFormButton label="Submit" type="submit" fullWidth={true} size="medium" />
        </AppForm>
      </Stack>
    </Stack>
  );
};

export default EventsForm;
