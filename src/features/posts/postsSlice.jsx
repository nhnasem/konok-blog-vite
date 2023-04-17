import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const postsAdapter = createEntityAdapter();
const initialState = postsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (pageNumber) => `/posts?pageNumber=${pageNumber}`,
      // transformResponse: (responseData) => {
      //   return postsAdapter.setAll(initialState, responseData);
      // },
      // providesTags: (result, error, arg) => [
      //   { type: "Post", id: "LIST" },
      //   ...result.ids.map((id) => ({ type: "Post", id })),
      // ],
      providesTags: ["Post"]
    }),

    getSinglePost: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: ["Post"]
    }),

    updatePost: builder.mutation({
      query: (initialPost) => ({
        url: `/posts/${initialPost.id}`,
        method: "PUT",
        body: {
          ...initialPost,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),

    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: {
          ...initialPost,
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),

    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetSinglePostQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
  useAddNewPostMutation,
} = extendedApiSlice;
