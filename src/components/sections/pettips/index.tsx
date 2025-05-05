import { useState, ChangeEvent, FC } from 'react';
import Grid from '@mui/material/Grid';
import TipsCard from './TipsCard';
import PageLoader from 'components/loader/PageLoader';
import { useQuery } from 'react-query';
import type { Tip } from 'services/tips/script';
import PageTitle from 'components/common/PageTitle';
import { Popup } from 'components/common/Popup';
import TipsForm from './TipsForm';
import { PetApis } from 'services/pet';
import { useDeleteTipMutation, useTipsQuery } from 'components/hooks/useTipsQuery';
import ConfirmAlert from 'components/common/ConfirmAlert';

const PetTipsResponsive: FC = () => {
  const { data: tipsData, isLoading } = useTipsQuery();
  const deleteTip = useDeleteTipMutation();

  const { getPetTypes } = new PetApis();

  const { data, isLoading: petTypeLoading } = useQuery(['pet-types'], getPetTypes, {
    staleTime: 1000 * 60 * 3,
  });

  const [selectedTipId, setSelectedTipId] = useState<number | string>(0);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openConfirmAlertModal, setOpenConfirmAlertModal] = useState(false);
  const [searchText, setSearchText] = useState<string>('');

  if (isLoading || petTypeLoading) return <PageLoader />;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const tipsArray: Tip[] = tipsData ?? [];

  const filteredTips = tipsArray.filter((tip) => {
    const search = searchText.toLowerCase();
    return (
      tip.title.toLowerCase().includes(search) ||
      tip.category.toLowerCase().includes(search) ||
      tip.overview.toLowerCase().includes(search)
    );
  });

  const handleOpenTipsAddModal = () => {
    setOpenAddModal(!openAddModal);
  };

  const handleOpenConfirmAlertModal = (id: number | string) => {
    setSelectedTipId(id);
    setOpenConfirmAlertModal(!openConfirmAlertModal);
  };

  const handleRemoveTip = () => {
    deleteTip.mutate(selectedTipId, {
      onSuccess: () => {
        setOpenConfirmAlertModal(false);
      },
    });
  };

  return (
    <>
      <PageTitle
        title="Pet Tips"
        btnText="Pet Tip"
        isSearchEnable={true}
        isAddEnable={true}
        searchText={searchText}
        handleInputChange={handleInputChange}
        openModal={handleOpenTipsAddModal}
      />

      <Grid container spacing={2}>
        {filteredTips.map((tip) => (
          <Grid key={tip.id} item xs={12} sm={6} md={4} lg={3}>
            <TipsCard data={tip} onEdit={() => {}} onRemove={handleOpenConfirmAlertModal} />
          </Grid>
        ))}
      </Grid>

      <Popup open={openAddModal} onClose={handleOpenTipsAddModal}>
        <TipsForm data={data?.pet_types} isEdit={false} onSuccess={handleOpenTipsAddModal} />
      </Popup>

      <Popup open={openConfirmAlertModal} onClose={handleOpenConfirmAlertModal}>
        <ConfirmAlert
          title="Are you sure you want to delete this tip?"
          message="This action cannot be undone."
          onConfirm={handleRemoveTip}
          onCancel={() => setOpenConfirmAlertModal(false)}
          isLoading={deleteTip.isLoading}
        />
      </Popup>
    </>
  );
};

export default PetTipsResponsive;
