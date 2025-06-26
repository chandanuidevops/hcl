import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../Config/configDetails";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import ShiftSchedulerDialog from "../Components/ShiftSchedulerDialog";
import axios from "axios";

const ShiftSchedulerPage = () => {

 const [view, setView] = useState("daily");
 const [open, setOpen] = React.useState(false);


 
    const handleChange = (event: SelectChangeEvent) => {
        setView(event.target.value);
        console.log("View changed to:", event.target.value);
    };

    
    const handleSave = (data:any) => {
        // Logic to save the shift data
        try{
            const response = axios.post(`${API_ENDPOINT}api/shift`, data);
            // Assuming the response is successful
            console.log("Shift data to be saved:", data);

            if (!response ) {
                throw new Error("Failed to save shift data");
            }
            console.log("Shift data saved successfully:", data);
        }catch(error) {
            console.error("Error saving shift data:", error);
        }
        // Close the dialog after saving
        setOpen(false); 
    };
    const handleClose = () => {
        setOpen(false);
    };


    const fetchShifts = async () => {
        try {
            const response = await fetch(`${API_ENDPOINT}api/shift`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log("Fetched shifts:", data);
        } catch (error) {
            console.error("Error fetching shifts:", error);
        }
    };

    useEffect(() => {
        fetchShifts();
    }, []);

    const rows = [
        { id: 1, type: "Morning", date: "2023-10-01", staff: "Dr. Asha" },
        { id: 2, type: "Afternoon", date: "2023-10-01", staff: "Nurse Raj" },
        { id: 3, type: "Night", date: "2023-10-01", staff: "Tech Kumar" },
        { id: 4, type: "Morning", date: "2023-10-02", staff: "Dr. Asha" },
        { id: 5, type: "Afternoon", date: "2023-10-02", staff: "Nurse Raj" },
        { id: 6, type: "Night", date: "2023-10-02", staff: "Tech Kumar" },
    ];

    return (
        <div style={{ padding: 24 }}>
            <Box style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '20px'}}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                Shift Schedule
            </Typography>
            <Button onClick={()=>setOpen((prev) => !prev)} variant="contained" color="primary" sx={{ borderRadius: 2,fontWeight:'bold', padding: '10px 20px', color:'black' }}>
                    Create Shift
            </Button>
            </Box>
            <FormControl sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <Select
                labelId="view-label"
                value={view}
                label="View"
                onChange={handleChange}
            >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
            </Select>
        </FormControl>
            <TableContainer
                component={Paper}
                sx={{ border: "1px solid #ddd", borderRadius: 2, boxShadow: 3 }}
            >
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                            <TableCell sx={{ fontWeight: "bold", border: "1px solid #ccc" }}>
                                Shift Type
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold", border: "1px solid #ccc" }}>
                                Date
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold", border: "1px solid #ccc" }}>
                                Assigned Staff
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id} hover>
                                <TableCell sx={{ border: "1px solid #eee" }}>{row.type}</TableCell>
                                <TableCell sx={{ border: "1px solid #eee" }}>{row.date}</TableCell>
                                <TableCell sx={{ border: "1px solid #eee" }}>{row.staff}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ShiftSchedulerDialog open={open} onClose={handleClose} onSave={handleSave}/>
        </div>
    );
};

export default ShiftSchedulerPage;
