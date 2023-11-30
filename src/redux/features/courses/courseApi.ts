import { api } from '@/redux/api/apiSlice';

const courseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: () => '/courses',
    }),
    getCourses: builder.query({
      query: () => '/courses/?limit=10&sortBy=createdAt&sortOrder=desc',
    }),
    singleCourse: builder.query({
      query: (id) => ({ url: `/courses/${id}` }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'DELETE',
      }),
    }),
    updateCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `/courses/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),

    postCourse: builder.mutation({
      query: (data) => ({
        url: `/courses/create-course`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useGetCoursesQuery,
  usePostCourseMutation,
  useSingleCourseQuery,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} = courseApi;
