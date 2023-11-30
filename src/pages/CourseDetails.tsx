import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  useDeleteCourseMutation,
  useSingleCourseQuery,
} from '@/redux/features/courses/courseApi';
import { Toaster, toast } from 'react-hot-toast';
import { useAppDispatch } from '@/redux/hook';
import { enrollCourse } from '@/redux/features/courses/enrolledCoursesSlice';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data } = useSingleCourseQuery(id);
  const course = data?.data;

  const [deleteCourseMutation] = useDeleteCourseMutation();
  const [isSyllabusExpanded, setSyllabusExpanded] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteCourseMutation(id);
      navigate('/courses');
    } catch (error) {
      console.error('Error deleting course', error);
    }
  };
  const handleEnroll = () => {
    dispatch(enrollCourse(course));
    toast.success('Enrolled in the course');
  };

  const toggleSyllabus = () => {
    setSyllabusExpanded(!isSyllabusExpanded);
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 p-8 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-blue-600">{course?.name}</h1>
        <button
          className="btn btn-green bg-orange-400 text-white hover:bg-green-400"
          onClick={handleEnroll}
        >
          Enroll
        </button>{' '}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            style={{ maxHeight: '500px' }}
            className="w-full  mb-4 rounded-lg"
            src={course?.thumbnail}
            alt="Course Thumbnail"
          />
        </div>
        <div className="space-y-4">
          <p className="text-xl">{`Instructor: ${course?.instructor}`}</p>
          <p className="text-xl">{`Enrollment Status: ${course?.enrollmentStatus}`}</p>
          <p className="text-xl">{`Duration: ${course?.duration}`}</p>
          <p className="text-xl">{`Schedule: ${course?.schedule}`}</p>
          <p className="text-xl">{`Location: ${course?.location}`}</p>
          <p className="text-xl">{`Prerequisites: ${
            course?.prerequisites?.join(', ') || 'None'
          }`}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-green-600">Description</h2>
        <p className="text-xl">{course?.description}</p>
      </div>

      <div className="mt-8">
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleSyllabus}
        >
          <h2 className="text-2xl font-semibold text-purple-600">Syllabus</h2>
          <span className="ml-2 text-xl">{isSyllabusExpanded ? '▲' : '▼'}</span>
        </div>
        {isSyllabusExpanded && (
          <ul className="list-disc pl-6">
            {course?.syllabus?.map((item: any) => (
              <li key={item.week} className="text-lg">
                <span className="font-semibold">{`Week ${item.week}: `}</span>
                {item.topic} - {item.content}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Toaster position="top-center" />
    </div>
  );
};

export default CourseDetails;
