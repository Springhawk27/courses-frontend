export type ICourseEnrollmentStatus = 'Open' | 'Closed' | 'In Progress';

export interface ICourse {
  _id?: number | string;
  name: string;
  instructor: string;
  description: string;
  enrollmentStatus?: ICourseEnrollmentStatus | null;
  thumbnail: string;
  duration: string;
  schedule: string;
  location: string;
  prerequisites: string[];
  syllabus: {
    week: number;
    topic: string;
    content: string;
  }[];
  students: {
    id: number;
    name: string;
    email: string;
  }[];
  completed?: boolean;
}
