import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    IconButton,
    InputAdornment,
    FormHelperText,
} from '@mui/material';
import { UserPayload } from 'services/management';
import IconifyIcon from 'components/base/IconifyIcon';

const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().when('isEdit', {
        is: false,
        then: (schema) => schema.required('Password is required').min(6, 'Minimum 6 characters'),
        otherwise: (schema) => schema.notRequired(),
    }),
    mobile: Yup.string()
        .matches(/^[0-9]+$/, 'Must contain only digits')
        .length(10, 'Must be exactly 10 digits')
        .required('Mobile number is required'),
    role: Yup.string().oneOf(['super-admin', 'admin', 'client']).required('Role is required'),
    client_key: Yup.string().when('role', {
        is: 'client',
        then: (schema) => schema.required('Client Key is required'),
        otherwise: (schema) => schema.notRequired(),
    }),
});

interface UserFormProps {
    initialValues?: any;
    onSubmit: (values: UserPayload) => void;
    onCancel: () => void;
    isLoading?: boolean;
    isReadOnly?: boolean;
}

const UserForm = ({ initialValues, onSubmit, onCancel, isLoading, isReadOnly }: UserFormProps) => {
    const isEdit = !!initialValues;

    const formik = useFormik({
        initialValues: {
            title: initialValues?.title || 'Mr',
            username: initialValues?.username || '',
            email: initialValues?.email || '',
            country_code: initialValues?.country_code?.replace('+', '') || '91',
            mobile: initialValues?.mobile || '',
            password: '',
            role: initialValues?.role || 'client',
            client_key: initialValues?.client_key || '',
            isEdit,
        },
        validationSchema,
        onSubmit: (values) => {
            const payload: any = { ...values };
            delete payload.isEdit;
            if (isEdit && !payload.password) {
                delete payload.password;
            }
            // Ensure mobile only contains digits before sending
            payload.mobile = payload.mobile.replace(/\D/g, '');
            onSubmit(payload);
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const countryCodes = [
        { label: 'India (+91)', value: '91' },
        { label: 'USA (+1)', value: '1' },
        { label: 'UK (+44)', value: '44' },
        { label: 'UAE (+971)', value: '971' },
        { label: 'Singapore (+65)', value: '65' },
    ];

    const clientKeys = [
        { label: 'Invictus', value: 'invictus' },
        { label: 'VLS Law', value: 'vls_law' },
        { label: 'Netralaya', value: 'netralaya' },
        { label: 'Pixel Eye', value: 'pixel_eye' },
        { label: 'Ophthall Webinar', value: 'ophthall_webinar' },
        { label: 'KR Institute', value: 'kr_institute' },
        { label: 'Wellinit', value: 'wellinit' },
        { label: 'Mirra Builders', value: 'mirra_builders' },
        { label: 'Mahimmy Foods', value: 'mahimmy_foods' },
        { label: 'Naitrika', value: 'naitrika' },
        { label: 'Ramanan Financial', value: 'ramanan_financial' },
    ];

    const inputSx = {
        '& .MuiInputBase-root': {
            height: 48,
        },
        '& .MuiOutlinedInput-input': {
            padding: '12px 14px',
        },
    };

    return (
        <Box sx={{ p: 4, width: { xs: '100%', sm: 400, md: 450 } }}>
            <Typography variant="h5" mb={4} sx={{ fontWeight: 700, color: 'text.primary' }}>
                {isEdit ? (isReadOnly ? 'User Details' : 'Update User') : 'New User Account'}
            </Typography>
            <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
                <Stack direction="column" spacing={3} width="100%">
                    <FormControl fullWidth disabled={isReadOnly} sx={inputSx}>
                        <InputLabel id="title-label">Title</InputLabel>
                        <Select
                            labelId="title-label"
                            name="title"
                            value={formik.values.title}
                            label="Title"
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="Mr">Mr.</MenuItem>
                            <MenuItem value="Ms">Ms.</MenuItem>
                            <MenuItem value="Mrs">Mrs.</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        name="username"
                        label="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && typeof formik.errors.username === 'string' ? (formik.errors.username as string) : ''}
                        disabled={isReadOnly}
                        sx={inputSx}
                    />

                    <TextField
                        fullWidth
                        name="email"
                        label="Email Address"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && typeof formik.errors.email === 'string' ? (formik.errors.email as string) : ''}
                        disabled={isReadOnly}
                        sx={inputSx}
                    />

                    <Stack direction="row" spacing={2}>
                        <FormControl sx={{ width: '150px', ...inputSx }} disabled={isReadOnly}>
                            <InputLabel id="country-code-label">Code</InputLabel>
                            <Select
                                labelId="country-code-label"
                                name="country_code"
                                value={formik.values.country_code}
                                label="Code"
                                onChange={formik.handleChange}
                            >
                                {countryCodes.map((cc) => (
                                    <MenuItem key={cc.value} value={cc.value}>
                                        {cc.value} ({cc.label.split('(')[0].trim()})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            name="mobile"
                            label="Mobile Number"
                            value={formik.values.mobile}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                if (val.length <= 10) {
                                    formik.setFieldValue('mobile', val);
                                }
                            }}
                            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                            helperText={formik.touched.mobile && typeof formik.errors.mobile === 'string' ? formik.errors.mobile : ''}
                            disabled={isReadOnly}
                            sx={inputSx}
                        />
                    </Stack>

                    {!isReadOnly && (
                        <TextField
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            label={isEdit ? 'New Password (Optional)' : 'Password'}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && typeof formik.errors.password === 'string' ? (formik.errors.password as string) : ''}
                            sx={inputSx}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowPassword} edge="end" size="small">
                                            <IconifyIcon icon={showPassword ? 'mingcute:eye-line' : 'mingcute:eye-close-line'} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}

                    <FormControl fullWidth disabled={isReadOnly} sx={inputSx}>
                        <InputLabel id="role-label">Account Role</InputLabel>
                        <Select
                            labelId="role-label"
                            name="role"
                            value={formik.values.role}
                            label="Account Role"
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="super-admin">Super Admin</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="client">Client</MenuItem>
                        </Select>
                    </FormControl>

                    {formik.values.role === 'client' && (
                        <FormControl fullWidth error={formik.touched.client_key && Boolean(formik.errors.client_key)} disabled={isReadOnly} sx={inputSx}>
                            <InputLabel id="client-key-label">Client Association</InputLabel>
                            <Select
                                labelId="client-key-label"
                                name="client_key"
                                value={formik.values.client_key}
                                label="Client Association"
                                onChange={formik.handleChange}
                            >
                                {clientKeys.map((ck) => (
                                    <MenuItem key={ck.value} value={ck.value}>
                                        {ck.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.client_key && formik.errors.client_key && (
                                <FormHelperText>
                                    {typeof formik.errors.client_key === 'string' ? (formik.errors.client_key as string) : ''}
                                </FormHelperText>
                            )}
                        </FormControl>
                    )}

                    <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                        <Button
                            onClick={onCancel}
                            sx={{ color: 'text.secondary', textTransform: 'none', fontWeight: 600 }}
                        >
                            {isReadOnly ? 'Close' : 'Cancel'}
                        </Button>
                        {!isReadOnly && (
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isLoading}
                                sx={{
                                    height: 48,
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    px: 4,
                                    borderRadius: '8px',
                                    boxShadow: 'none',
                                    backgroundColor: '#2D3748',
                                    '&:hover': { backgroundColor: '#1A202C', boxShadow: 'none' }
                                }}
                            >
                                {isEdit ? 'Save Changes' : 'Create User'}
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </form>
        </Box>
    );
};

export default UserForm;
