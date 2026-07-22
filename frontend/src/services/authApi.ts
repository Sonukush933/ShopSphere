import { api } from './api';
import { login as loginAction } from '../features/auth/authSlice';

import type {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  MeResponse,
} from '../types/auth.types';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            loginAction({
              user: data.data.user,
              accessToken: data.data.accessToken,
            }),
          );
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
    }),

    me: builder.query<MeResponse, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            loginAction({
              user: data.data,
              accessToken: null,
            }),
          );
        } catch {
          // User is not logged in
        }
      },
    }),

    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useMeQuery,
  useLogoutMutation,
} = authApi;
