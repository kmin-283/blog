import React from "react";
import { signIn } from "next-auth/client";

const Login = () => {
  return (
    <>
      <h1>로그인을 먼저 해 주세요</h1>
      <button onClick={() => signIn()}>로그인</button>
    </>
  );
};

export default Login;
