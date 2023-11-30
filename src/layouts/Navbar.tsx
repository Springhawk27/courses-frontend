import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar bg-orange-400 ">
      <div className="flex-1">
        <div className="font-extrabold pl-2">
          <Link to="/">
            <span className="text-purple-600">Course</span>
            {''}
            <span className="text-gray-100">~Mate</span>
          </Link>
        </div>
      </div>

      <div className="flex-none text-white text-bold">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          {/* <li>
            <Link to="/addcourse">Add New Course</Link>
          </li> */}
          <li>
            <details className="dropdown dropdown-end">
              <summary tabIndex={0}>Profile</summary>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52 text-black"
              >
                <li>
                  <Link to="/enrolledcourses">Dashboard</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
