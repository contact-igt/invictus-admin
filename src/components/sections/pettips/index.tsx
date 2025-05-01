import  { useState, ChangeEvent, FC } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { InputAdornment, Stack, TextField } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import TaskCard from './TipsCard';
import PageLoader from 'components/loader/PageLoader';
import { useQuery } from 'react-query';
import { TipApis } from 'services/tips';
import type { Tip } from 'services/tips/script';

const PetTipsResponsive: FC = () => {
  const { getAllTips } = new TipApis();

  const { data: tipsData, isLoading } = useQuery<Tip[], Error>(['tips'], getAllTips, {
    staleTime: 1000 * 60 * 3,
  });

  const [searchText, setSearchText] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  if (isLoading) return <PageLoader />;

  const tipsArray: Tip[] = tipsData ?? [];

  const filteredTips = tipsArray.filter((tip) => {
    const search = searchText.toLowerCase();
    return tip.title.toLowerCase().includes(search) || tip.category.toLowerCase().includes(search);
  });

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4" component="h2">
          Pet Tips
        </Typography>
        <TextField
          variant="filled"
          size="small"
          placeholder="Search Tips"
          value={searchText}
          onChange={handleInputChange}
          sx={{ width: 1, maxWidth: 300 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconifyIcon icon="mynaui:search" />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Grid container spacing={2}>
        {filteredTips.map((tip) => (
          <Grid key={tip.id} item xs={12} sm={6} md={4} lg={3}>
            <TaskCard data={tip} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PetTipsResponsive;
