import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[94vh] w-[100vw] bg-[#9DC7CC]">
      <h1 className="text-9xl text-white mb-10">ProMa</h1>
      <p className="text-4xl text-white">Project management made easy</p>
      <div className="flex flex-col gap-y-12 mt-[6rem]">
        <Link
          to={"/login"}
          className="flex h-12 w-28 bg-white items-center justify-center rounded-lg 
          text-2xl hover:bg-[#238995] hover:text-white duration-200"
        >
          Log in
        </Link>
        <Link
          to={"/signup"}
          className="flex h-12 w-28 bg-white items-center justify-center rounded-lg text-2xl
          hover:bg-[#238995] hover:text-white duration-200"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
