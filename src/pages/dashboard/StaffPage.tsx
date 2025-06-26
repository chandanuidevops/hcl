import React, { useState } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography,
    TextField,
    Button,
    MenuItem,
    Grid,
    Paper,
} from '@mui/material';
const StaffPage: React.FC = () => {
    const roles = ['Doctor', 'Nurse', 'Technician'];
    const shifts = ['Morning', 'Afternoon', 'Night'];
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        staffId: '',
        shift: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        console.log('Staff Added:', formData);
        setFormData({ name: '', role: '', staffId: '', shift: '' });
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
                            name="shift"
                            value={formData.shift}
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
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Add Staff
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default StaffPage