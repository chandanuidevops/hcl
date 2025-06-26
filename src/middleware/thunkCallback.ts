
import { GetApi } from "./apiConfig";
export const getApi = async ({ url, dispatch }) => {
    const result = await GetApi({
        url: `${url}`,
    }).catch((error) => {
        throw error;
    });
    return result;
};
