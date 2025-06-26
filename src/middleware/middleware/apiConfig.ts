import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASEURL;

// ========== Types ==========
interface ApiBaseParams {
    url: string;
    token?: string;
    extraHeaders?: Record<string, string>;
}

interface PostApiParams extends ApiBaseParams {
    body?: unknown;
    contentType?: string;
}

interface GetApiParams extends ApiBaseParams {
    params?: Record<string, any>;
}

// ========== PostApi ==========
export const PostApi = async <T = any>({
    url,
    body = {},
    token,
    contentType = "application/json",
    extraHeaders = {},
}: PostApiParams): Promise<T> => {
    const headers: Record<string, string> = {
        "Content-Type": contentType,
        ...(token && { Authorization: `Bearer ${token}` }),
        ...extraHeaders,
    };

    try {
        const { data } = await axios.post<T>(url, body, { headers });
        return data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            // unauthorizedHandle(); // You can call logout or token clear here
        } else if (
            error.response?.status === 400 &&
            error.response?.data?.message?.includes("password has expired")
        ) {
            // Handle password expiration case
        }
        throw error;
    }
};

// ========== GetApi ==========
export const GetApi = async <T = any>({
    url,
    token,
    params = {},
    extraHeaders = {},
}: GetApiParams): Promise<T> => {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...extraHeaders,
    };

    try {
        const { data } = await axios.get<T>(url, { params, headers });
        return data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            // unauthorizedHandle();
        } else if (
            error.response?.status === 400 &&
            error.response?.data?.message?.includes("password has expired")
        ) {
            // Handle password expiration case
        }
        throw error;
    }
};
