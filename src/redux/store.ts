import { configureStore } from "@reduxjs/toolkit";

import staffSlice from './staffSlice'
export const store = configureStore({
    reducer: {
        staffs: staffSlice,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;