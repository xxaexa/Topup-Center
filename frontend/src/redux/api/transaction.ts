import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import {
  TransactionProps,
  TransactionResponse,
  CreateTransactionRequest,
  UpdateTransactionRequest,
  CreateTransactionResponse,
  TransactionResponseList
} from "../../types/index";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: customFetchBase,
  tagTypes: ["Transaction"],
  endpoints: (builder) => ({
    getTransactions: builder.query<TransactionProps[], void>({
      query: () => ({
        url: "/transaction",
      }),
      transformResponse: (response: TransactionResponse) => response.data,
      providesTags: [{ type: "Transaction", id: "LIST" }],
    }),

    getTransactionById: builder.query<TransactionProps, string>({
      query: (id) => ({
        url: `/transaction/${id}`,
      }),
      transformResponse: (response: TransactionResponseList) => response.data,
      providesTags: [{ type: "Transaction", id: "LIST" }],
    }),

    createTransaction: builder.mutation<CreateTransactionResponse, CreateTransactionRequest>({
      query: (body) => ({
        url: "/transaction/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Transaction", id: "LIST" }],
    }),

    updateTransaction: builder.mutation<unknown, UpdateTransactionRequest>({
      query: ({ _id, ...body }) => ({
        url: `/transaction/${_id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Transaction", id: "LIST" }],
    }),

    updateTransactionStatus: builder.mutation<UpdateTransactionRequest, string>({
      query: (id) => ({
        url: `/transaction/update-status/${id}`,
        method: "GET",
      }),
      invalidatesTags: [{ type: "Transaction", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useUpdateTransactionStatusMutation,
} = transactionApi;
