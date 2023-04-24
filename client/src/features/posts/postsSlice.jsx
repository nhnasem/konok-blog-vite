import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

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
        method: "PATCH",
        body: {
          ...initialPost,
        },
      }),
      invalidatesTags: ["Post"],
    }),

    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/posts",
        method: "POST",
        body: {
          ...initialPost,
        },
      }),
      invalidatesTags: ["Post"],
    }),

    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Post"],
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
