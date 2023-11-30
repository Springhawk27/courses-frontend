import { ICourse } from '@/types/globalTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const LOCAL_STORAGE_KEY = 'enrolledCourses';

interface IEnrolledCourses {
  courses: ICourse[];
}

const loadEnrolledCoursesFromLocalStorage = (): IEnrolledCourses => {
  const savedEnrolledCourses = localStorage.getItem(LOCAL_STORAGE_KEY);
  return savedEnrolledCourses
    ? JSON.parse(savedEnrolledCourses)
    : { courses: [] };
};

const initialState: IEnrolledCourses = loadEnrolledCoursesFromLocalStorage();

const enrolledCoursesSlice = createSlice({
  name: 'enrolledCourses',
  initialState,
  reducers: {
    enrollCourse: (state, action: PayloadAction<ICourse>) => {
      const exists = state.courses.some(
        (course) => course._id === action.payload._id
      );
      if (!exists) {
        state.courses.push({ ...action.payload, completed: false });
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
      }
    },

    unenrollCourse: (state, action: PayloadAction<ICourse>) => {
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload._id
      );
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    },

    markAsComplete: (state, action: PayloadAction<ICourse>) => {
      const course = state.courses.find(
        (course) => course._id === action.payload._id
      );
      if (course) {
        course.completed = true;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
      }
    },

    markAsIncomplete: (state, action: PayloadAction<ICourse>) => {
      const course = state.courses.find(
        (course) => course._id === action.payload._id
      );
      if (course) {
        course.completed = false;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
      }
    },
  },
});

export const {
  enrollCourse,
  unenrollCourse,
  markAsComplete,
  markAsIncomplete,
} = enrolledCoursesSlice.actions;
export default enrolledCoursesSlice.reducer;
