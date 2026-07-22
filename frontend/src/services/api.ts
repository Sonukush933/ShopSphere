import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { logout } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Original API Call
  let result = await baseQuery(args, api, extraOptions);

  // Access Token Expired
  if (
    result.error &&
    result.error.status === 401 &&
    (typeof args === 'string'
      ? args !== '/auth/refresh'
      : args.url !== '/auth/refresh')
  ) {
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',

  baseQuery: baseQueryWithReauth,

  tagTypes: [],

  endpoints: () => ({}),
});
