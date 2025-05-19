/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Typography } from '@mui/material';
import AppForm from 'components/common/Forms/AppForm';
import AppFormButton from 'components/common/Forms/AppFormButton';
import { editDescriptionValidationSchema } from 'schemas/validations';
import AppFormTextArea from 'components/common/Forms/AppFormTextArea';

interface EditDescriptionFormProps {
  pet: { description?: string };
}

const EditDescriptionForm: React.FC<EditDescriptionFormProps> = ({ pet }) => {

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Stack width={500} flexDirection="column" p={2} overflow={'scroll'}>
      <Typography align="left" variant="h4">
       Edit Description
      </Typography>
      <Stack mt={3} direction="column" gap={2}>
        <AppForm
          initialValues={{
            description: pet?.description || '',
          }}
          validationSchema={editDescriptionValidationSchema}
          onSubmit={handleSubmit}
        >
          <AppFormTextArea
            name="description"
            label="Pet Description"
            placeholder="Enter Pet Description"
            icon="mdi:text-box-outline"
            variant="standard"
            rows={4}
          />

          <AppFormButton label="Save" type="submit" fullWidth={true} size="medium" />
        </AppForm>
      </Stack>
    </Stack>
  );
};

export default EditDescriptionForm;
