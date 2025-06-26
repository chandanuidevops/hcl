import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "../utils/cookies";
import { loginAPI } from "../middleware/authServices";
import { createHandledThunk } from "../utils/apiHandler";

// ======================= Types =======================
interface AuthData {
    id?: string;
    name?: string;
    email?: string;
    [key: string]: any; // For additional dynamic user props
}

interface AuthState {
    authData: AuthData;
    isSubmitting: boolean;
    token: string | null;
    authPage: "login" | "forgotPassword";
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
export const login = createHandledThunk<LoginPayload, { body: LoginPayload }, LoginResponse>(
    "auth/login",
    loginAPI,
    {
        argsBuilder: (payload) => ({ body: payload }),
        onError: (error) => (error as any)?.response?.data?.data,
        postSuccess: (data) => {
            const { token, ...userData } = data?.data || {};
            if (token) {
                setCookie("token", token);
            }
            localStorage.setItem("authData", JSON.stringify(userData));
        },
    }
);

// ======================= Initial State =======================
const initialState: AuthState = {
    authData: JSON.parse(localStorage.getItem("authData") || "{}"),
    isSubmitting: false,
    token: getCookie("token") || null,
    authPage: "login",
};

// ======================= Slice =======================
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthPage: (state, action: PayloadAction<"login" | "forgotPassword">) => {
            state.authPage = action.payload;
        },
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.isSubmitting = true;
                state.authData = {};
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.isSubmitting = false;
                const { token, ...userData } = action.payload.data || {};
                state.authData = userData;
                state.token = token || null;
            })
            .addCase(login.rejected, (state) => {
                state.isSubmitting = false;
                state.authData = {};
            });
    },
});

// ======================= Exports =======================
export const { setAuthPage, setToken } = authSlice.actions;
export default authSlice.reducer;
