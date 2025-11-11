import Sidebar from "@components/Sidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <Sidebar />

      <main
        className="
          flex-1 
          w-full 
          p-4 sm:p-6 md:p-8 
          overflow-y-auto 
          md:ml-0
          transition-all
          bg-gray-50
        "
      >
        <div className="max-w-6xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
