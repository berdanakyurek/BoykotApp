import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import QueryBarcodeRequest from '../models/QueryBarcodeRequest';
import QueryBarcodeResponse from '../models/QueryBarcodeResponse';

const prefix = "http://13.60.40.160:5162/api/Boykot/";
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: prefix }),
  endpoints: (builder) => ({
    getTags: builder.query<{ id: string; name: string }[], void>({
      query: (req) => ({
        url: prefix + `GetTags`,
        method: 'GET',
      }),
    }),
    queryBarcode: builder.query<QueryBarcodeResponse, QueryBarcodeRequest>({
      query: (req) => ({
        url: prefix + `QueryBarcode`,
        method: 'POST',
        body: req,
      }),
    }),
  }),
});

export const { useGetTagsQuery, useLazyQueryBarcodeQuery } = api;
