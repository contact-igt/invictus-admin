/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Typography } from '@mui/material';
import AppForm from 'components/common/Forms/AppForm';
import AppFormTextField from 'components/common/Forms/AppTextFeild';
import { eventValidationSchema } from 'schemas/validations';
import AppFormButton from 'components/common/Forms/AppFormButton';
import AppFormTextArea from 'components/common/Forms/AppFormTextArea';

const EventsForm = ({ isEdit }: any) => {
  const handleSubmit = (values: any) => {
    console.log('Form Values:', values);
  };

  return (
    <Stack width={500} flexDirection="column" p={2}>
      <Typography align="left" variant="h4">
        {isEdit ? 'Edit Event' : 'Add Event'}
      </Typography>
      <Stack mt={3} direction="column" gap={2}>
        <AppForm
          initialValues={{
            event_title: '',
            event_description: '',
            full_address: '',
            pin_location: '',
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

          <AppFormButton label="Submit" type="submit" fullWidth={true} size="medium" />
        </AppForm>
      </Stack>
    </Stack>
  );
};

export default EventsForm;
