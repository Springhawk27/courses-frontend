import EnrolledCourseCard from '@/components/EnrolledCourseCard';
import { useAppSelector } from '@/redux/hook';
import { ICourse } from '@/types/globalTypes';

const EnrolledCourses = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { courses } = useAppSelector(
    (state: { enrolledCourses: any }) => state.enrolledCourses
  );

  return (
    <div>
      <h1 className="text-2xl md:px-8 px-4 pt-8 pb-2">My Enrolled Courses</h1>
      <hr className="md:mx-8 mx-4" />

      <div className="px-8 py-16 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {courses?.map((course: ICourse) => (
          <EnrolledCourseCard key={course?._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;
