import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Common from "./common";
import { Header } from "./components/Header";
export default function AdminPage() {
  const [openBar, setOpenBar] = useState(true);
  return (
    <>
      <Header openBar={openBar} setOpenBar={setOpenBar} />
      <Common openBar={openBar}>
        <Outlet />
      </Common>
    </>
  );
}
