'use client';

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import FormNewPost from "./Form/FormNewPost";

export default function ButtonPost() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <>
      <button
        className="bg-blue-800 text-white text-lg font-semibold rounded-full p-2 pt-3 flex gap-3 justify-center items-center w-full hover:bg-blue-700 transition-all duration-200 ease-in-out cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          setIsAddOpen(!isAddOpen);
        }}
      >
        <FaPlus />
        New Post
      </button>

      {isAddOpen && <FormNewPost handleClose={() => setIsAddOpen(false)} />}
    </>
  );
}
