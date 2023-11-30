import CourseCard from '@/components/CourseCard';
import { useGetCoursesQuery } from '@/redux/features/courses/courseApi';
import { ICourse } from '@/types/globalTypes';
import { Link } from 'react-router-dom';

const Home = () => {
  const { data } = useGetCoursesQuery(undefined);

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello, Learner!</h1>
            <p className="py-6">
              Explore a world of knowledge. Enrich your skills by taking
              courses. Remember, "Continuous learning is the key to success."
            </p>
            <Link
              to="/courses"
              className="btn btn-primary bg-orange-400 text-white"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </div>
      <div className="py-12">
        <div className="flex flex-col justify-center items-center">
          {' '}
          <h1 className="text-center text-2xl text-bold py-4">
            Explore our latest courses available
          </h1>
          <hr className="h-1 w-1/6 bg-orange-400" />
        </div>

        <div className="px-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {data?.data.map((course: ICourse) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
