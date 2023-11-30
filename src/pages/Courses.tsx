import CourseCard from '@/components/CourseCard';
import { useGetAllCoursesQuery } from '@/redux/features/courses/courseApi';
import {
  setEnrollmentStatus,
  setSearchQuery,
} from '@/redux/features/courses/courseSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { ICourse } from '@/types/globalTypes';

const Courses = () => {
  const { data } = useGetAllCoursesQuery(undefined);

  const { enrollmentStatus, searchQuery } = useAppSelector(
    (state) => state.course
  );
  const dispatch = useAppDispatch();

  const enrollmentStatuses = new Set<string>(
    data?.data.map((course: ICourse) => course?.enrollmentStatus)
  );

  // search
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setSearchQuery(event.target.value));
  };

  let coursesData = data?.data;

  if (enrollmentStatus) {
    coursesData = coursesData?.filter(
      (item: { enrollmentStatus: string }) =>
        item.enrollmentStatus === enrollmentStatus
    );
  }

  if (searchQuery.trim() !== '') {
    coursesData = coursesData?.filter(
      (course: ICourse) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div>
      <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
        <div className="sm:col-span-3 col-span-12 z md:mr-10 mr-0  space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky bg-white top-16 md:h-[calc(100vh-80px)] h-20vh">
          <div>
            <h1 className="text-2xl uppercase">Filter By:</h1>

            <p className="text-purple-400">{enrollmentStatus}</p>
            <div className="flex items-center space-x-2 mt-3">
              <div className="dropdown dropdown-hover">
                <label
                  tabIndex={0}
                  className="btn m-1 text-white bg-orange-400"
                >
                  Enrollment Status
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li
                    onClick={() => {
                      dispatch(setEnrollmentStatus(''));
                    }}
                    key={enrollmentStatus}
                    className="cursor-pointer hover:bg-base-200"
                  >
                    All
                  </li>
                  {Array.from(enrollmentStatuses).map((status: string) => (
                    <li
                      onClick={() => {
                        dispatch(setEnrollmentStatus(status));
                      }}
                      key={status}
                      className="cursor-pointer hover:bg-base-200"
                    >
                      {status}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="grid sm:col-span-9 col-span-12  pb-20">
          <div>
            {' '}
            <div className="col-span-3 w-full py-4">
              <input
                type="text"
                placeholder="Search courses"
                className="input input-bordered input-warning w-full"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols gap-10 pb-20">
            {coursesData?.map((course: ICourse) => (
              <CourseCard key={course?._id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
