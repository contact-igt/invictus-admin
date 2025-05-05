import  { useState, ChangeEvent, FC } from 'react';
import Grid from '@mui/material/Grid';
import TipsCard from './TipsCard';
import PageLoader from 'components/loader/PageLoader';
import { useQuery } from 'react-query';
import { TipApis } from 'services/tips';
import type { Tip } from 'services/tips/script';
import PageTitle from 'components/common/PageTitle';
import { Popup } from 'components/common/Popup';
import TipsForm from './TipsForm';
import { PetApis } from 'services/pet';

const PetTipsResponsive: FC = () => {
  const { getAllTips } = new TipApis();
   const { getPetTypes } = new PetApis();
  const [openAddModal, setOpenAddModal] = useState(false);

  const { data: tipsData, isLoading } = useQuery<Tip[], Error>(['tips'], getAllTips, {
    staleTime: 1000 * 60 * 3,
  });
  const { data, isLoading: petTypeLoading } = useQuery(['pet-types'], getPetTypes, {
      staleTime: 1000 * 60 * 3,
    });
  
  const [searchText, setSearchText] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  if (isLoading || petTypeLoading) return <PageLoader />;

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
            <TipsCard data={tip} />
          </Grid>
        ))}
      </Grid>

      <Popup open={openAddModal} onClose={handleOpenTipsAddModal}>
        <TipsForm data={data?.pet_types} isEdit={false} />
      </Popup>
    </>
  );
};

export default PetTipsResponsive;
