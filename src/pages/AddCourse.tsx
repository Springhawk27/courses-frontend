import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePostCourseMutation } from '@/redux/features/courses/courseApi';
import { ICourse, ICourseEnrollmentStatus } from '@/types/globalTypes';

interface IAddCourse {
  name: string;
  instructor: string;
  description: string;
  enrollmentStatus: ICourseEnrollmentStatus;
  thumbnail: string;
  duration: string;
  schedule: string;
  location: string;
  prerequisites: string | string[];
  week: number;
  topic: string;
  content: string;
  students: {
    id: number;
    name: string;
    email: string;
  }[];
}

const AddCourse = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IAddCourse>();

  const [postCourse] = usePostCourseMutation();

  const [showToast, setShowToast] = useState(false);

  const [message, setMessage] = useState<string | null>(null);
  const [messageCode, setMessageCode] = useState<number | null>(null);

  const onSubmit = async (data: IAddCourse) => {
    let prerequisitesValue: string[] = [];

    if (Array.isArray(data.prerequisites)) {
      prerequisitesValue = data.prerequisites;
    } else if (typeof data.prerequisites === 'string') {
      prerequisitesValue = [data.prerequisites];
    }

    const options: ICourse = {
      name: data.name,
      instructor: data.instructor,
      description: data.description,
      enrollmentStatus: data.enrollmentStatus,
      thumbnail: data.thumbnail,
      duration: data.duration,
      schedule: data.schedule,
      location: data.location,
      prerequisites: prerequisitesValue,
      syllabus: [
        {
          week: data.week,
          topic: data.topic,
          content: data.content,
        },
      ],
      students: [
        {
          id: 123,
          name: 'John',
          email: 'john@gmail.com',
        },
      ],
    };

    try {
      const response = await postCourse(options);
      if ('error' in response) {
        console.log(response.error);
        setMessage('Failed to create the course. Please try again.');
        setShowToast(true);
        setMessageCode(0);
      } else {
        setMessage('Course created successfully.');
        setShowToast(true);
        setMessageCode(1);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      setShowToast(true);
      setMessageCode(0);
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <>
      {showToast && messageCode === 1 && (
        <div className="toast toast-top toast-center bg-success rounded-md mt-4">
          <div className="alert alert-success">
            <span>{message}</span>
          </div>
        </div>
      )}
      {showToast && messageCode === 0 && (
        <div className="toast toast-top toast-center bg-error rounded-md mt-4 text-white">
          <div className="alert alert-error">
            <span>{message}</span>
          </div>
        </div>
      )}

      <div className="px-12 md:py-24 py-12 flex flex-col justify-center items-center">
        <div className="md:w-2/5 w-full">
          <h3 className="flex justify-start underline">Add a new course</h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form-control w-full max-w-xs"
          >
            <label className="label">
              <span className="label-text">Course Name</span>
            </label>
            <input
              id="name"
              placeholder="course name"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              {...register('name', { required: 'Course Name is required' })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && <p>{errors.name.message}</p>}

            <label className="label">
              <span className="label-text">Instructor</span>
            </label>
            <input
              id="instructor"
              placeholder="instructor name"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('instructor', {
                required: 'Instructor is required',
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.instructor && <p>{errors.instructor.message} </p>}

            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              id="description"
              placeholder="course description"
              rows={3}
              {...register('description', {
                required: 'Description is required',
              })}
              className="textarea textarea-bordered w-full max-w-xs"
            />
            {errors.description && <p>{errors.description.message}</p>}

            <label className="label">
              <span className="label-text">Enrollment Status</span>
            </label>
            <select
              id="enrollmentStatus"
              {...register('enrollmentStatus', {
                required: 'Enrollment Status is required',
              })}
              className="select select-bordered w-full max-w-xs"
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="In Progress">In Progress</option>
            </select>
            {errors.enrollmentStatus && (
              <p>{errors.enrollmentStatus.message}</p>
            )}

            <label className="label">
              <span className="label-text">Thumbnail URL</span>
            </label>
            <input
              id="thumbnail"
              placeholder="thumbnail URL"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('thumbnail', {
                required: 'Thumbnail URL is required',
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.thumbnail && <p>{errors.thumbnail.message}</p>}

            <label className="label">
              <span className="label-text">Duration</span>
            </label>
            <input
              id="duration"
              placeholder="course duration"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('duration', { required: 'Duration is required' })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.duration && <p>{errors.duration.message}</p>}

            <label className="label">
              <span className="label-text">Schedule</span>
            </label>
            <input
              id="schedule"
              placeholder="course schedule"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('schedule', { required: 'Schedule is required' })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.schedule && <p>{errors.schedule.message}</p>}

            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              id="location"
              placeholder="course location"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('location', { required: 'Location is required' })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.location && <p>{errors.location.message}</p>}

            <label className="label">
              <span className="label-text">Prerequisites</span>
            </label>
            <input
              id="prerequisites"
              placeholder="prerequisite courses"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('prerequisites', {
                required: 'Prerequisites are required',
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.prerequisites && <p>{errors.prerequisites.message}</p>}
            <label className="label">
              <span className="label-text">Syllabus</span>
            </label>
            <input
              id="week"
              placeholder="week"
              type="number"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('week', {
                required: 'Week is required',
              })}
              className="input input-bordered w-full max-w-xs mb-1"
            />
            {errors.week && <p>{errors.week.message}</p>}

            <input
              id="topic"
              placeholder="topic"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('topic', {
                required: 'Topic is required',
              })}
              className="input input-bordered w-full max-w-xs mb-1"
            />
            {errors.topic && <p>{errors.topic.message}</p>}

            <input
              id="content"
              placeholder="content"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('content', {
                required: 'Content is required',
              })}
              className="input input-bordered w-full max-w-xs mb-1"
            />
            {errors.content && <p>{errors.content.message}</p>}

            <button className="btn btn-outline btn-secondary mt-4 ">
              Create Course
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCourse;
