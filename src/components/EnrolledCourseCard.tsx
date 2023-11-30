import {
  unenrollCourse,
  markAsComplete,
  markAsIncomplete,
} from '@/redux/features/courses/enrolledCoursesSlice';
import { useAppDispatch } from '@/redux/hook';
import { ICourse } from '@/types/globalTypes';
import { Link } from 'react-router-dom';

interface IProps {
  course: ICourse;
}

const EnrolledCourseCard = ({ course }: IProps) => {
  const dispatch = useAppDispatch();

  const handleUnenrollCourse = () => {
    dispatch(unenrollCourse(course));
  };

  const handleMarkAsComplete = () => {
    dispatch(markAsComplete(course));
  };
  const handleMarkAsIncomplete = () => {
    dispatch(markAsIncomplete(course));
  };

  return (
    <div
      className={`card w-auto shadow-xl ${
        course.completed ? 'bg-green-100' : 'bg-gray-100'
      }`}
    >
      <div className="card-body items-center text-center">
        <img
          src={course.thumbnail}
          alt={course.name}
          className="w-full mb-4 rounded-lg"
        />
        <h2 className="card-title">{course.name}</h2>
        <p>Instructor: {course.instructor}</p>
        <p>Enrollment Status: {course.enrollmentStatus}</p>
        <p>Duration: {course.duration}</p>
        <p>Schedule: {course.schedule}</p>
        <p>Location: {course.location}</p>
        <div className="card-actions flex flex-col justify-center items-center">
          <Link
            to={`/courses/${course._id}`}
            className="btn btn-primary border-0 bg-orange-400 text-white"
          >
            Details
          </Link>
          <div className="space-x-2 space-y-2">
            <button
              onClick={handleUnenrollCourse}
              className="btn btn-small text-xs border-none bg-yellow-100"
            >
              Unenroll
            </button>
            {course.completed ? (
              <button
                onClick={handleMarkAsIncomplete}
                className="btn btn-small text-xs border-none bg-green-200"
              >
                Mark as Incomplete
              </button>
            ) : (
              <button
                onClick={handleMarkAsComplete}
                className="btn btn-small text-xs border-none bg-green-200"
              >
                Mark as Complete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;
