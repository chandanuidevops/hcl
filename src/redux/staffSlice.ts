import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createHandledThunk } from "../utils/apiHandler";
import { addStaffs } from "../middleware/staffService"; // Staff API
import { loginAPI } from "../middleware/authServices"; // Login API

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
}

interface LoginResponse {
    data: {
        token: string;
        [key: string]: any;
    };
}

interface LoginPayload {
    username: string;
    password: string;
}

// ======================= Thunks =======================

// 👉 Thunk for login (auth)
export const loginUser = createHandledThunk<LoginPayload, { body: LoginPayload }, LoginResponse>(
    "auth/login",
    loginAPI,
    {
        argsBuilder: (payload) => ({ body: payload }),
        onError: (error) => (error as any)?.response?.data?.data,
    }
);

// 👉 Thunk for creating staff
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

// ======================= Initial State =======================
const initialState: StaffState = {
    staffList: [],
    isSubmitting: false,

};

// ======================= Slice =======================
const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {},
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

        // Login (if you want to handle it in this slice, otherwise move it to authSlice)
        builder
            .addCase(loginUser.pending, (state) => {
                state.isSubmitting = true;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.isSubmitting = false;
            })
            .addCase(loginUser.rejected, (state) => {
                state.isSubmitting = false;
            });
    },
});

// ======================= Exports =======================
export const { } = staffSlice.actions;
export default staffSlice.reducer;
