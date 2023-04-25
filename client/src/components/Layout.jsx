import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="">
      <Navbar />
      <main className="mt-24">
        <Outlet />
      </main>
    </div>
  );
}
