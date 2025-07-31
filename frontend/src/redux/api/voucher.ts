import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import {
  VoucherProps,
  VoucherResponse,
  CreateVoucherRequest,
  UpdateVoucherRequest,
} from "../../types/index";

export const voucherApi = createApi({
  reducerPath: "voucherApi",
  baseQuery: customFetchBase,
  tagTypes: ["Voucher"],
  endpoints: (builder) => ({
    getVouchers: builder.query<VoucherProps[], void>({
      query: () => ({
        url: "/voucher/",
      }),
      transformResponse: (response: VoucherResponse) => response.data,
      providesTags: [{ type: "Voucher", id: "LIST" }],
    }),

    getVoucherById: builder.query<VoucherProps, string>({
      query: (id) => ({
        url: `/voucher/${id}`,
      }),
      transformResponse: (response: { data: VoucherProps[] }) => response.data[0],
      providesTags: [{ type: "Voucher", id: "LIST" }],
    }),

    getVoucherByGameName: builder.query<VoucherProps, string>({
      query: (gameName) => ({
        url: `/voucher/game/${gameName}`,
      }),
      transformResponse: (response: { data: VoucherProps[] }) => response.data[0],
      providesTags: [{ type: "Voucher", id: "LIST" }],
    }),

    createVoucher: builder.mutation<unknown, CreateVoucherRequest>({
      query: (body) => ({
        url: "/voucher",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: VoucherProps[] }) => response.data[0],
      invalidatesTags: [{ type: "Voucher", id: "LIST" }],
    }),

    updateVoucher: builder.mutation<unknown, UpdateVoucherRequest>({
      query: ({ id, ...body }) => ({
        url: `/voucher/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Voucher"],
    }),

    deleteVoucher: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/voucher/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Voucher"],
    }),
  }),
});

export const {
  useGetVouchersQuery,
  useGetVoucherByIdQuery,
  useCreateVoucherMutation,
  useUpdateVoucherMutation,
  useDeleteVoucherMutation,
  useGetVoucherByGameNameQuery,
  
} = voucherApi;
