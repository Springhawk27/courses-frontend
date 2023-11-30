import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ICourse {
  enrollmentStatus: string | null;
  searchQuery: string;
}

const initialState: ICourse = {
  enrollmentStatus: null,
  searchQuery: '',
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setEnrollmentStatus: (state, action: PayloadAction<string>) => {
      state.enrollmentStatus = action.payload;
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setEnrollmentStatus, setSearchQuery } = courseSlice.actions;

export default courseSlice.reducer;
