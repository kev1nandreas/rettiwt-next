"use client";

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import FormUpdatePost from "../Form/FormUpdatePost";
import Image from "next/image";
import { useDeleteTweet, useFetchTweet } from "@/app/(main)/api/useTweet";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/toolkit/store";

interface PostCardProps {
  date: string;
  content: string;
  like: number;
  id: number;
  isSaved: boolean;
  name: string;
  username: string;
}

export default function PostCard({
  content,
  like,
  id,
  isSaved,
  name,
  username,
}: PostCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isShowSaved, setIsShowSaved] = useState(isSaved);
  const [showContent, setShowContent] = useState(content);
  const [edit, setEdit] = useState<number | null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const { refetch } = useFetchTweet();
  const savedUsername = useSelector(
    (state: RootState) => state.username.Username
  );

  const removeTweet = useDeleteTweet({
    id: id,
    onSuccess: () => {
      toast.success("Tweet deleted successfully!");
      refetch();
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const handleDelete = () => {
    removeTweet.mutateAsync();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col w-full p-3 rounded-lg bg-white">
      {/* Info Sender */}
      <div className="flex justify-between items-center">
        <div className="flex align-center">
          <Image
            src={"/female-ava.png"}
            alt={"avatar"}
            width={100}
            height={100}
            draggable={false}
            className="w-[2.5rem] h-[2.5rem] rounded-full m-2 pointer-events-none select-none"
          />
          <div className="flex justify-center flex-col">
            <p className="font-semibold text-sm">{name}</p>
            <p className="text-xs opacity-50">{"@" + username}</p>
          </div>
        </div>

        {/* Button */}
        {username === savedUsername && (
          <div className="relative">
            {/* Button Open */}
            <HiOutlineDotsHorizontal
              className="text-2xl cursor-pointer mr-3"
              onClick={() => setIsOpen(true)}
            />

            {isOpen && (
              <div
                className="absolute top-0 right-0 text-left bg-gray-50 rounded-lg p-2 flex flex-col gap-2 z-10 w-[8rem] border-[1px] border-slate-200"
                ref={divRef}
              >
                <div
                  className="flex gap-2 items-center cursor-pointer hover:text-blue-400 duration-200 transition-all ease-in-out"
                  onClick={() => setEdit(id)}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <MdModeEditOutline /> Edit
                  </span>
                </div>
                <div
                  className="flex gap-2 items-center cursor-pointer hover:text-blue-400 duration-200 transition-all ease-in-out"
                  onClick={() => handleDelete()}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <MdDeleteOutline /> Delete
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <p className="m-2 text-left">{showContent}</p>

      {/* Button Group */}
      <div className="flex border-t-[1px] border-slate-200 justify-evenly p-2 mt-2">
        <button className="flex gap-2 justify-center items-center cursor-pointer hover:text-blue-400 duration-200 transition-all ease-in-out">
          {like > 0 ? <BiSolidLike /> : <BiLike />}
          <p>{like} Like</p>
        </button>
        <button className="flex gap-2 justify-center items-center cursor-pointer hover:text-blue-400 duration-200 transition-all ease-in-out">
          {isShowSaved ? <IoBookmark /> : <IoBookmarkOutline />}
          {isShowSaved ? <p>Bookmarked</p> : <p>Bookmark</p>}
        </button>
      </div>

      {/* Edit Section */}
      {edit && (
        <FormUpdatePost
          handleClose={() => setEdit(null)}
          data={content}
          id={edit}
        />
      )}
    </div>
  );
}
