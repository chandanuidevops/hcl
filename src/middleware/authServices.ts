// API calls

import { postToEndpoint } from "./apiEndPoint";


// import { postToEndpoint } from "./apiEndPoint";

export const loginAPI = async ({ body }) =>
    await postToEndpoint({
        endpoint: "ap/portal/auth/login",
        body,
    });

export const forgotLoginApi = async ({ id }) =>
    await postToEndpoint({
        endpoint: "ap/portal/forgot-password",
        query: { dealerId: id },
    });

export const resetPasswordApi = async ({ body }) =>
    await postToEndpoint({
        endpoint: "ap/portal/reset-password",
        body,
    });
export const logoutApi = async () => {
    return Promise.resolve({ success: true });
};