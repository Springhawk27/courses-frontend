import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/apiSlice';
import courseReducer from './features/courses/courseSlice';
import enrolledCoursesReducer from './features/courses/enrolledCoursesSlice';

const store = configureStore({
  reducer: {
    course: courseReducer,
    enrolledCourses: enrolledCoursesReducer,

    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
