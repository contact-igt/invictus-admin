import { useState, ChangeEvent } from 'react';
import { tasks } from 'data/tasks';
import TaskCard from './TipsCard';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { InputAdornment, Stack, TextField } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

const PetTipsResponsive = () => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    const search = searchText.toLowerCase();
    return (
      task.title.toLowerCase().includes(search) || task.category.toLowerCase().includes(search)
    );
  });

  return (
    <>
       <Stack alignItems="center" justifyContent="space-between">
        <Typography variant="h4" component="h2" minWidth={200}>
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
        {filteredTasks.map((task) => (
          <Grid key={task.id} item xs={12} sm={6} md={4} lg={3}>
            <TaskCard data={task} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PetTipsResponsive;
