import { PostApi } from "./apiConfig";
import { MAIN_URL } from "./apiConstants";

// Define types for the function parameters
interface PostToEndpointParams<TBody = unknown, TQuery = Record<string, string | number | boolean>> {
    endpoint: string;
    body?: TBody;
    query?: TQuery;
}

// Generic helper to post with optional body and query string
export const postToEndpoint = async <
    TResponse = any,
    TBody = unknown,
    TQuery extends Record<string, string | number | boolean> = Record<string, string | number | boolean>
>({
    endpoint,
    body,
    query,
}: PostToEndpointParams<TBody, TQuery>): Promise<TResponse> => {
    let url = `${MAIN_URL}${endpoint}`;

    if (query) {
        const queryString = new URLSearchParams(
            Object.fromEntries(
                Object.entries(query).map(([key, value]) => [key, String(value)])
            )
        ).toString();

        url += `?${queryString}`;
    }

    return await PostApi<TResponse>({ url, body });
};
