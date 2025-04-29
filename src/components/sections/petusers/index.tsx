import { useState, ChangeEvent } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconifyIcon from 'components/base/IconifyIcon';
import UsersTable from './UsersTable';

const TaskOverview = () => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <Stack direction="column" spacing={1} width={1}>
      <Stack alignItems="center" justifyContent="space-between">
        <Typography variant="h4" component="h2" minWidth={200}>
          Our Users
        </Typography>
        <TextField
          variant="filled"
          size="small"
          placeholder="Search User"
          value={searchText}
          onChange={handleInputChange}
          sx={{ width: 1, maxWidth: 250 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconifyIcon icon={'mynaui:search'} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Paper sx={{ mt: 1.5, p: 0, pb: 0.75, minHeight: 411, width: 1 }}>
        <UsersTable searchText={searchText} />
      </Paper>
    </Stack>
  );
};

export default TaskOverview;
