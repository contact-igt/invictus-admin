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
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      justifyContent="space-between"
      flexWrap="wrap"
      mb={2}
    >
      <Typography variant="h4" component="h2" minWidth={200}>
        {title}
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        width={{ xs: '100%', sm: 'auto' }}
      >
        {isSearchEnable && (
          <TextField
            variant="filled"
            size="small"
            placeholder={`Search ${title}`}
            value={searchText}
            onChange={handleInputChange}
            sx={{ width: { xs: '100%', sm: 300 } }}
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
          <CardActions
            disableSpacing
            sx={{ p: 0, width: { xs: '100%', sm: 210 } }}
            onClick={openModal}
          >
            <Button
              variant="contained"
              size="medium"
              startIcon={<IconifyIcon icon="gridicons:plus-small" />}
              fullWidth
              sx={{
                color: 'primary.info',
                '& .MuiButton-startIcon': { mr: 0, pointerEvents: 'none' },
              }}
            >
              {`Add ${btnText}`}
            </Button>
          </CardActions>
        )}
      </Stack>
    </Stack>
  );
};

export default PageTitle;
