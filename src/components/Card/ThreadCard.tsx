"use client";

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { MdModeEditOutline, MdOutlineComment } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import FormUpdatePost from "../Form/FormUpdatePost";
import Image from "next/image";
import { useDeleteTweet, useFetchTweetbyId } from "@/app/(main)/api/useTweet";
import toast from "react-hot-toast";
import { useGetUsername } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useDeleteLike, useSetLike } from "@/app/(main)/api/useLike";
import { ENV } from "@/configs/environment";
import FormReply from "../Form/FormReply";

interface PostCardProps {
  content: string;
  like: number;
  id: number;
  name: string;
  username: string;
  picture_url: string;
}

export default function ThreadCard({
  content,
  like,
  id,
  name,
  username,
  picture_url,
}: PostCardProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const [edit, setEdit] = useState<number | null>(null);
  const savedUsername = useGetUsername();
  const { postId } = useParams();
  const { refetch } = useFetchTweetbyId(postId as string);

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

  const likeTweet = useSetLike({
    id: id,
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const unlikeTweet = useDeleteLike({
    id: id,
    onSuccess: () => {
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

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (like > 0) {
      unlikeTweet.mutateAsync();
    } else {
      likeTweet.mutateAsync(new FormData());
    }
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
    <div className="flex justify-center w-full p-3 bg-white cursor-pointer">
      <div className="w-3 mr-4 border-r-2 border-slate-200"></div>
      <div
        className="flex flex-col w-full "
        onClick={() => router.push("/status/" + id)}
      >
        {/* Info Sender */}
        <div className="flex justify-between items-center">
          <div
            className="flex align-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              router.push("/" + username);
            }}
          >
            {picture_url ? (
              <Image
                src={ENV.URI.BASE_IMAGE_URL + picture_url}
                alt={picture_url}
                width={100}
                height={100}
                draggable={false}
                className="md:w-[2.5rem] md:h-[2.5rem] rounded-full md:m-2 pointer-events-none select-none"
              />
            ) : (
              <Image
                src={"/female-ava.png"}
                alt={"avatar"}
                width={100}
                height={100}
                draggable={false}
                className="md:w-[2.5rem] md:h-[2.5rem] rounded-full md:m-2 pointer-events-none select-none"
              />
            )}
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
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
              />

              {isOpen && (
                <div
                  className="absolute top-0 right-0 text-left bg-gray-50 rounded-lg p-2 flex flex-col gap-2 z-10 w-[8rem] border-[1px] border-slate-200"
                  ref={divRef}
                  onClick={(e) => e.stopPropagation()}
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
        <p className="m-2 text-left">{content}</p>

        {/* Button Group */}
        <div className="flex border-t-[1px] border-slate-200 justify-evenly p-2 mt-2">
          <button
            className="flex gap-2 justify-center items-center cursor-pointer hover:text-blue-400 duration-200 transition-all ease-in-out"
            onClick={(e) => handleLike(e)}
          >
            {like > 0 ? <BiSolidLike /> : <BiLike />}
            {like > 0 ? <p>Liked</p> : <p>Like</p>}
          </button>
          <button
            className="flex gap-2 justify-center items-center cursor-pointer hover:text-blue-400 duration-200 transition-all ease-in-out"
            onClick={(e) => {
              e.stopPropagation();
              setIsReplyOpen(true);
            }}
          >
            <MdOutlineComment />
            <p>Comment</p>
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

        {/* Reply Section */}
        {isReplyOpen && (
          <FormReply
            handleClose={() => setIsReplyOpen(false)}
            parentId={id}
            parentUsername={username}
            parentName={name}
            parentContent={content}
            parentPictureUrl={picture_url || ""}
          />
        )}
      </div>
      <div className="w-3 mr-4"></div>
    </div>
  );
}
