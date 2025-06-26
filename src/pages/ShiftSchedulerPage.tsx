import React, { useEffect } from "react";
import { API_ENDPOINT } from "../Config/configDetails";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

const ShiftSchedulerPage = () => {
    const fetchShifts = async () => {
        try {
            const response = await fetch(`${API_ENDPOINT}api/shifts`);
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
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                Shift Schedule
            </Typography>
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
        </div>
    );
};

export default ShiftSchedulerPage;
