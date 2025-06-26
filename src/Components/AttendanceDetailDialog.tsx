import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { API_ENDPOINT } from "../Config/configDetails";
import html2pdf from "html2pdf.js";

const AttendanceDetailDialog = () => {
    const [open, setOpen] = useState(false);
    const [attendanceData, setAttendanceData] = useState<any[]>([]);
    const contentRef = useRef(null);
    const handleClose = () => {};

    useEffect(() => {
        fetchAttendanceData();
    }, []);

    const fetchAttendanceData = async () => {
        try {
            const response = await axios.get(`${API_ENDPOINT}/api/attendance/`);
            console.log("Attendance Data:", response.data);
            setAttendanceData(response.data);
        } catch (error) {
            console.error("Error fetching attendance data:", error);
        }

        const handleDownloadPdf = () => {
            const element = contentRef.current;
            const options = {
                margin: 0.5,
                filename: "page-content.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
            };

            html2pdf().set(options).from(element).save();
        };

        const columns: GridColDef[] = [
            // { field: "id", headerName: "ID", width: 70 },
            { field: "name", headerName: "Name", width: 200 },
            { field: "role", headerName: "Role", width: 150 },
            { field: "shift", headerName: "Shift", width: 150 },
        ];

        const rows = [
            { id: 1, name: "Dr. Asha", role: "Doctor", shift: "Morning" },
            { id: 2, name: "Nurse Raj", role: "Nurse", shift: "Afternoon" },
            { id: 3, name: "Tech Kumar", role: "Technician", shift: "Night" },
        ];

        return (
            <>
                <Box>
                    <button
                        onClick={handleDownloadPdf}
                        style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end" }}
                    >
                        Download PDF
                    </button>
                </Box>
                <Box ref={contentRef}>
                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Mark Attendance</DialogTitle>
                    <DialogContent>
                        <Paper sx={{ height: 400, width: "100%" }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                autoHeight
                            />
                        </Paper>
                    </DialogContent>
                    <DialogActions>
                        {/* <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        Submit
                    </Button> */}
                    </DialogActions>
                </Dialog>
                </Box>
            </>
        );
    };
};
export default AttendanceDetailDialog;
