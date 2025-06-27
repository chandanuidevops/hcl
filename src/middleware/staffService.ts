// API calls

import { postToEndpoint, getToEndpoint } from "./apiEndPoint";


// import { postToEndpoint } from "./apiEndPoint";

export const addStaffs = async ({ body }) =>
    await postToEndpoint({
        endpoint: "api/staff/addstaff",
        body,
    });

export const searchStaff = async ({ query }) =>
    await getToEndpoint({
        endpoint: "api/staff/search",
        query,
    });

