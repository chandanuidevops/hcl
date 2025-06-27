import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    MenuItem,
    Grid,
} from '@mui/material';
import { useAppDispatch } from '../../redux/hooks';
import { createStaff, } from '../../redux/staffSlice';
import StaffTable from './StaffTable';
// import { addStaff } from '../../redux/staffSlice';

const StaffPage: React.FC = () => {

    const roles = ['Doctor', 'Nurse', 'Technician'];
    const shifts = ['morning', 'afternoon', 'night'];
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        staffId: '',
        shiftPreference: '',
        contactNumber: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        console.log('Staff Added:', formData);
        dispatch(createStaff(formData));

        setFormData({
            name: '',
            role: '',
            staffId: '',
            shiftPreference: '',
            contactNumber: '',
        });
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Add Staff
            </Typography>
            <Paper elevation={3} sx={{ p: 3, maxWidth: 600 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            fullWidth
                            label="Role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            {roles.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Staff ID"
                            name="staffId"
                            value={formData.staffId}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            fullWidth
                            label="Shift"
                            name="shiftPreference"
                            value={formData.shiftPreference}
                            onChange={handleChange}
                        >
                            {shifts.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Contact Number"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            disabled={
                                !formData.name ||
                                !formData.role ||
                                !formData.staffId ||
                                !formData.shiftPreference
                            }
                        >
                            Add Staff
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <StaffTable />
        </Box>
    );
};

export default StaffPage;
