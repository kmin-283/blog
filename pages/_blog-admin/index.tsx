import React from "react";
import { useSession } from "next-auth/client";
import Login from "@/components/login/login";

const Admin = () => {
  const [session] = useSession();
  return (
    <>
      {!session && <Login />}
      {session && <h1>admin 페이지. 통계적인 자료가 보여지면 좋을 것 같다.</h1>}
    </>
  );
};
export default Admin;
