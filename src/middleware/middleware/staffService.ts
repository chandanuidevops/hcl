// API calls

import { postToEndpoint } from "./apiEndPoint";


// import { postToEndpoint } from "./apiEndPoint";

export const addStaffs = async ({ body }) =>
    await postToEndpoint({
        endpoint: "api/staff/addstaff",
        body,
    });

