/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ChangeEvent } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import PageTitle from 'components/common/PageTitle';
import PageLoader from 'components/loader/PageLoader';
import InvictusMetaTable from './invictusMetaTable';
import { useInvictusMetaQuery } from 'components/hooks/useInvictusQuery';

const InvictusMetaSection = () => {
    const { data: usersData, isLoading } = useInvictusMetaQuery()
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    if (isLoading) return <PageLoader />;

    return (
        <>
            <Stack direction="column" spacing={1} width={1}>
                <PageTitle
                    title="Invictus Meta Users"
                    btnText="Invictus Meta Users"
                    searchText={searchText}
                    handleInputChange={handleInputChange}
                />
                <Paper sx={{ mt: 1.5, p: 0, pb: 0.75, minHeight: 411, width: 1 }}>
                    <InvictusMetaTable
                        searchText={searchText}
                        usersData={usersData?.data}
                    />
                </Paper>
            </Stack>

        </>
    );
};

export default InvictusMetaSection;
