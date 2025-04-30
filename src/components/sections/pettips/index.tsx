import { useState, ChangeEvent } from 'react';
import { tasks } from 'data/tasks';
import TaskCard from './TipsCard';
import Grid from '@mui/material/Grid';
import PageTitle from 'components/common/PageTitle';

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
      <PageTitle title="Pet Tips" searchText={searchText} handleInputChange={handleInputChange} />
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
