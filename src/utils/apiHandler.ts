import { createAsyncThunk, Dispatch } from "@reduxjs/toolkit";

// Define the shape of handleAsyncThunk config
interface HandleAsyncThunkConfig<TArgs, TResult> {
    apiFunc: (args: TArgs) => Promise<TResult>;
    args: TArgs;
    dispatch: Dispatch;
    onSuccess?: (data: TResult) => any;
    onError?: (error: unknown) => any;
    postSuccess?: (data: TResult) => void;
}

export const handleAsyncThunk = async <TArgs, TResult>({
    apiFunc,
    args,
    dispatch,
    onSuccess,
    onError,
    postSuccess,
}: HandleAsyncThunkConfig<TArgs, TResult>): Promise<TResult> => {
    try {
        const data = await apiFunc(args);

        // Uncomment if successAlert is used
        // if (onSuccess) dispatch(successAlert(onSuccess(data)));
        if (postSuccess) postSuccess(data);

        return data;
    } catch (error) {
        if (onError) {
            onError(error);
            // dispatch(errorAlert(onError(error)));
        } else {
            // dispatch(errorAlert((error as any)?.response?.data?.message || "Something went wrong"));
        }
        throw error;
    }
};

// Types for createHandledThunk
interface CreateHandledThunkConfig<TPayload, TArgs, TResult> {
    argsBuilder?: (payload: TPayload) => TArgs;
    onSuccess?: (data: TResult) => any;
    onError?: (error: unknown) => any;
    postSuccess?: (data: TResult) => void;
}

export const createHandledThunk = <TPayload, TArgs, TResult>(
    type: string,
    apiFunc: (args: TArgs) => Promise<TResult>,
    config: CreateHandledThunkConfig<TPayload, TArgs, TResult> = {}
) =>
    createAsyncThunk<TResult, TPayload>(
        type,
        async (payload, { dispatch }) => {
            const args = config.argsBuilder ? config.argsBuilder(payload) : (payload as unknown as TArgs);
            return await handleAsyncThunk<TArgs, TResult>({
                apiFunc,
                args,
                dispatch,
                onSuccess: config.onSuccess,
                onError: config.onError,
                postSuccess: config.postSuccess,
            });
        }
    );
