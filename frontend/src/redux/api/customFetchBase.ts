import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getUserFromLocalStorage, removeUserFromLocalStorage } from "../../utils/localStorage";
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";


const baseUrl = import.meta.env.VITE_BACKEND_API;

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const user = getUserFromLocalStorage();
    if (user?.accessToken) {
      headers.set("Authorization", `Bearer ${user.accessToken}`);
    }
    return headers;
  },
});

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    removeUserFromLocalStorage();
    window.location.href = "/login"; 
  }
  return result;
};

export default baseQuery;
