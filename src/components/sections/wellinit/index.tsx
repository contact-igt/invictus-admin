/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ChangeEvent } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import PageTitle from 'components/common/PageTitle';
import PageLoader from 'components/loader/PageLoader';
import { useNaitrikaQuery } from 'components/hooks/useNaitrikaQuery';
import WellinitTable from './wellinitTable';
import { useWellinitQuery } from 'components/hooks/useWellinitQuery';

const WellinitSection = () => {
    const { data: usersData, isLoading } = useWellinitQuery();
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    if (isLoading) return <PageLoader />;


    return (
        <>
            <Stack direction="column" spacing={1} width={1}>
                <PageTitle
                    title="Wellinit Users"
                    btnText="Wellinit Users"
                    searchText={searchText}
                    handleInputChange={handleInputChange}
                />
                <Paper sx={{ mt: 1.5, p: 0, pb: 0.75, minHeight: 411, width: 1 }}>
                    <WellinitTable
                        searchText={searchText}
                        usersData={usersData?.data}
                    />
                </Paper>
            </Stack>
        </>
    );
};

export default WellinitSection;