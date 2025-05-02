/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from '@mui/material/Typography';
import { Button, CardActions, InputAdornment, Stack, TextField } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

const PageTitle = ({
  title,
  btnText,
  isSearchEnable = true,
  isAddEnable = true,
  searchText,
  handleInputChange,
  openModal,
}: any) => {
  return (
    <>
      <Stack alignItems="center" justifyContent="space-between">
        <Typography variant="h4" component="h2" minWidth={200}>
          {title}
        </Typography>
        <Stack alignItems="center">
          {isSearchEnable && (
            <TextField
              variant="filled"
              size="small"
              placeholder={`Search ${title}`}
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
          )}
          {isAddEnable && (
            <CardActions disableSpacing sx={{ marginLeft: 3, width: '210px' }} onClick={openModal}>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  color: 'primary.info',
                  '& .MuiButton-startIcon': { mr: 0, pointerEvents: 'none' },
                }}
                startIcon={<IconifyIcon icon="gridicons:plus-small" />}
                fullWidth
              >
                {`Add ${btnText}`}
              </Button>
            </CardActions>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default PageTitle;
