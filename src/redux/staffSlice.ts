import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createHandledThunk } from "../utils/apiHandler";
import { addStaffs, searchStaff } from "../middleware/staffService";

// ======================= Types =======================
export interface Staff {
    name: string;
    role: string;
    staffId: string;
    shiftPreference: string;
    contactNumber: string;
}

interface StaffState {
    staffList: Staff[];
    isSubmitting: boolean;
    isSearching: boolean;
}

interface SearchQuery {
    name?: string;
    role?: string;
    staffId?: string;
    shiftPreference?: string;
    contactNumber?: string;
    [key: string]: string | undefined;
}

// ======================= Thunks =======================

// Create Staff
export const createStaff = createHandledThunk<Staff, { body: Staff }, any>(
    "staff/create",
    addStaffs,
    {
        argsBuilder: (payload) => ({ body: payload }),
        onError: (error) => (error as any)?.response?.data?.data,
        postSuccess: (data) => {
            console.log("Staff added successfully:", data);
        },
    }
);

// Search Staff
export const searchStaffThunk = createHandledThunk<SearchQuery, { query: SearchQuery }, Staff[]>(
    "staff/search",
    searchStaff,
    {
        argsBuilder: (query) => ({ query }),
        onError: (error) => (error as any)?.response?.data?.message || "Search failed",
    }
);

// ======================= Initial State =======================
const initialState: StaffState = {
    staffList: [],
    isSubmitting: false,
    isSearching: false,
};

// ======================= Slice =======================
const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {
        clearStaffList: (state) => {
            state.staffList = [];
        },
    },
    extraReducers: (builder) => {
        // Create Staff
        builder
            .addCase(createStaff.pending, (state) => {
                state.isSubmitting = true;
            })
            .addCase(createStaff.fulfilled, (state, action: PayloadAction<Staff>) => {
                state.isSubmitting = false;
                state.staffList.push(action.payload);
            })
            .addCase(createStaff.rejected, (state) => {
                state.isSubmitting = false;
            });

        // Search Staff
        builder
            .addCase(searchStaffThunk.pending, (state) => {
                state.isSearching = true;
            })
            .addCase(searchStaffThunk.fulfilled, (state, action: PayloadAction<Staff[]>) => {
                state.isSearching = false;
                state.staffList = action.payload
            })
            .addCase(searchStaffThunk.rejected, (state) => {
                state.isSearching = false;
                state.staffList = [];
            });
    },
});

// ======================= Exports =======================
export const { clearStaffList } = staffSlice.actions;
export default staffSlice.reducer;
