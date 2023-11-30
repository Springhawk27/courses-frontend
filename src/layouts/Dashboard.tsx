import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <main className="flex w-full h-screen">
        <aside className="w-80 h-screen bg-gray shadow-md w-fulll hidden sm:block">
          <div className="flex flex-col justify-between h-screen p-4 bg-gray-800">
            <div className="text-sm text-left">
              <div>
                <div className="bg-gray-900 flex justify-between items-center text-white p-2 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300">
                  <NavLink
                    style={{ textDecoration: 'none' }}
                    to={`/dashboard/enrolledcourses`}
                  >
                    <button color="inherit"> Enrolled Courses</button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="w-full p-4 overflow-y-auto">
          <div className="w-full h-100 border-solid border-2 p-4 text-md">
            <Outlet></Outlet>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
