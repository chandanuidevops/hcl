import React, { useState, useMemo, useEffect } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { searchStaffThunk } from '../../redux/staffSlice';

const StaffTable: React.FC = () => {
    const dispatch = useAppDispatch();

    // ✅ Fix: use only if reducer still stores `data.data`
    const rawStaffList = useAppSelector((state) => state.staffs.staffList ?? []);
    const [list, setList] = useState([])
    const [searchFilters, setSearchFilters] = useState({
        name: '',
        role: '',
        shiftPreference: '',
    });

    useEffect(() => {

        if (searchFilters.name?.length) {


            // dispatch(searchStaffThunk({ page: '1', limit: '10', ...query }));
        } else {
            dispatch(searchStaffThunk({ page: '1', limit: '10' }));
        }

    }, [dispatch, searchFilters]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSearchFilters((prev) => ({ ...prev, [name]: value }));

    };

    // const filteredData = useMemo(() => {
    //     return rawStaffList.filter((staff) =>
    //         staff.name.toLowerCase().includes(searchFilters.name.toLowerCase()) &&
    //         staff.role.toLowerCase().includes(searchFilters.role.toLowerCase()) &&
    //         staff.shiftPreference.toLowerCase().includes(searchFilters.shiftPreference.toLowerCase())
    //     );
    // }, [rawStaffList, searchFilters]);


    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Staff Records
            </Typography>
            <Paper sx={{ p: 2 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        label="Search Name"
                                        variant="standard"
                                        name="name"
                                        value={searchFilters.name}
                                        onChange={handleSearchChange}
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        label="Search Role"
                                        variant="standard"
                                        name="role"
                                        value={searchFilters.role}
                                        onChange={handleSearchChange}
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        label="Search Shift"
                                        variant="standard"
                                        name="shiftPreference"
                                        value={searchFilters.shiftPreference}
                                        onChange={handleSearchChange}
                                        fullWidth
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell><strong>Role</strong></TableCell>
                                <TableCell><strong>Shift</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.length > 0 ? (
                                list.map((staff, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{staff.name}</TableCell>
                                        <TableCell>{staff.role}</TableCell>
                                        <TableCell>{staff.shiftPreference}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        No results found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default StaffTable;
