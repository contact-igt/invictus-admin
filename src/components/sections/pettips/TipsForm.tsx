/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Typography } from '@mui/material';
import AppForm from 'components/common/Forms/AppForm';
import AppFormTextField from 'components/common/Forms/AppTextFeild';
import AppFormButton from 'components/common/Forms/AppFormButton';
import { EventsFormProps, PetTypes } from 'services/pet/script';
import AppFormSelect from 'components/common/Forms/AppFormSelectFeild';
import { tipValidationSchema } from 'schemas/validations';
import AppFormTextArea from 'components/common/Forms/AppFormTextArea';
import AppFormImagePicker from 'components/common/Forms/AppFormIndieImagePicker';
import { useAddTipMutation, useUpdateTipMutation } from 'components/hooks/useTipsQuery';

interface TipsFormProps extends EventsFormProps {
  onSuccess: () => void;
  tip?: any;
}
const TipsForm: React.FC<TipsFormProps> = ({ isEdit, data, tip, onSuccess }) => {
  const { mutate: AddMutate, isLoading: addTipLoading } = useAddTipMutation();
  const { mutate: UpdateMutate, isLoading: updateTipLoading } = useUpdateTipMutation();

  const handleSubmit = (values: any) => {
    if (tip?.id) {
      UpdateMutate(
        { id: tip.id, values },
        {
          onSuccess: () => {
            onSuccess();
          },
        },
      );
    } else {
      AddMutate(values, {
        onSuccess: () => {
          onSuccess();
        },
      });
    }
  };

  return (
    <Stack width={500} flexDirection="column" p={2} overflow={'scroll'} height={600}>
      <Typography align="left" variant="h4">
        {isEdit ? 'Edit Tip' : 'Add Tip'}
      </Typography>
      <Stack mt={3} direction="column" gap={2}>
        <AppForm
          initialValues={{
            title: tip?.title || '',
            category: tip?.category ? [tip.category] : '',
            overview: tip?.overview || '',
            description: tip?.description || '',
            image: tip?.image || '',
          }}
          validationSchema={tipValidationSchema}
          onSubmit={handleSubmit}
        >
          <AppFormImagePicker name="image" />

          <AppFormTextField
            name="title"
            label="Tip Title"
            placeholder="Enter Tip Title"
            icon="mdi:lightbulb-on-outline"
            variant="standard"
          />

          <AppFormSelect
            name="category"
            label="Pet Type(s)"
            options={data?.map((pet: PetTypes) => ({ label: pet.label, value: pet.value }))}
            placeholder="Select Pet Type(s)"
            icon="hugeicons:type-cursor"
            variant="standard"
            InputProps={{
              sx: { marginTop: '30px !important' },
            }}
          />
          <AppFormTextField
            name="overview"
            label="Tip Overview"
            placeholder="Enter Tip Overview"
            icon="mdi:file-document-outline"
            variant="standard"
          />

          <AppFormTextArea
            name="description"
            label="Tip Description"
            placeholder="Enter Tip Description"
            icon="mdi:text-box-outline"
            variant="standard"
            rows={4}
          />

          <AppFormButton
            label="Save"
            type="submit"
            fullWidth={true}
            size="medium"
            isLoading={addTipLoading || updateTipLoading}
          />
        </AppForm>
      </Stack>
    </Stack>
  );
};

export default TipsForm;
