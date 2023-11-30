import { ICourse } from '@/types/globalTypes';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }: { course: ICourse }) => {
  return (
    <div className="card shadow-lg p-6">
      <img
        src={course.thumbnail}
        alt={course.name}
        className="mb-4 rounded-lg"
      />
      <h2 className="text-xl font-bold mb-2">{course.name}</h2>
      <p className="text-gray-600">{course.instructor}</p>
      <Link
        to={`/courses/${course._id}`}
        className="btn btn-primary bg-orange-400 text-white mt-4"
      >
        View Details
      </Link>
    </div>
  );
};

export default CourseCard;
