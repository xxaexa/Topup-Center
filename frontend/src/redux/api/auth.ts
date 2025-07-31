import { createApi } from "@reduxjs/toolkit/query/react";
import { IUserResponse,ILoginProps,UserData,IRegisterProps } from "../../types";
import customFetchBase from "./customFetchBase";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    loginUser: builder.mutation<UserData, ILoginProps>({
      query(values) {
        return {
          url: "auth/login",
          method: "POST",
          body: values,
        };
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),

    registerUser: builder.mutation<IUserResponse, IRegisterProps>({
      query(values) {
        return {
          url: "auth/register",
          method: "POST",
          body: values,
        };
      },
    }),

    refreshToken: builder.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: "auth/refresh-token",
        method: "POST",
        credentials: "include", 
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useRefreshTokenMutation,
} = authApi;




