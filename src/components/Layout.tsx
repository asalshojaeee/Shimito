import React from "react";
import { Outlet } from "react-router";

const Layout: React.FC = () => {
  return (
    <main
      className="min-h-screen h-full text-white bg-gradient-to-br from-[#000105] via-[#250033] to-[#50006B]"
    >
      <div className="relative flex flex-col items-center">
        {/* <Navbar /> */}
        {/* <div className="h-48"></div> */}
        <Outlet />
        {/* <div className="h-24"></div> */}
      </div>
    </main>
  );
};

export default Layout;
