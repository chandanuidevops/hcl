import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Grid,
} from "@mui/material";

const shiftTypes = ["Morning", "Afternoon", "Night"];
const staffList = ["Dr. Asha", "Nurse Raj", "Tech Kumar"];

interface ShiftSchedulerDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (shiftData: { date: string; shift: string; staff: string }) => void;
}

const ShiftSchedulerDialog: React.FC<ShiftSchedulerDialogProps> = ({ open, onClose, onSave }) => {
    const [date, setDate] = useState("");
    const [shift, setShift] = useState("");
    const [staff, setStaff] = useState("");

    const handleSave = () => {
        if (date && shift && staff) {
            // onSave({ date, shift, staff });
            handleClose();
        }
    };

    const handleClose = () => {
        setDate("");
        setShift("");
        setStaff("");
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Assign Shift</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} mt={1}>
                    <Grid item xs={12}>
                        <TextField
                            label="Date"
                            type="date"
                            fullWidth
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            label="Shift Type"
                            fullWidth
                            value={shift}
                            onChange={(e) => setShift(e.target.value)}
                        >
                            {shiftTypes.map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            label="Assign Staff"
                            fullWidth
                            value={staff}
                            onChange={(e) => setStaff(e.target.value)}
                        >
                            {staffList.map((s) => (
                                <MenuItem key={s} value={s}>
                                    {s}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSave} variant="contained" color="primary" disabled={!date || !shift || !staff}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ShiftSchedulerDialog;
