import Sidebar from "@/components/Sidebar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex">
      <Sidebar />
      <section className="flex-1">{children}</section>
    </main>
  );
};

export default HomeLayout;
