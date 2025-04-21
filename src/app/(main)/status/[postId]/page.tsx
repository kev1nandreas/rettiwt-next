"use client";

import { typecastTweetDetailResponse } from "@/types/response";
import { useFetchTweetbyId } from "../../api/useTweet";
import { useParams } from "next/navigation";
import ThreadCard from "@/components/Card/ThreadCard";
import ReplyCard from "@/components/Card/ReplyCard";
import { FaArrowLeft } from "react-icons/fa";
import LoadingComp from "@/components/Loading";
import MainThread from "@/components/Card/MainThread";

export default function PostPage() {
  const { postId } = useParams();
  
  const { data, isLoading } = useFetchTweetbyId(postId as string, 50, 1);
  const tweet = typecastTweetDetailResponse(data?.data);
  const threads =
    tweet?.replies
      .filter(
        (reply) => reply.user.id === tweet.user.id && reply.is_deleted === false
      )
      .reverse() || [];
  const replies =
    tweet?.replies
      .filter(
        (reply) => reply.user.id !== tweet.user.id && reply.is_deleted === false
      )
      .reverse() || [];

  return (
    <div className="relative flex flex-col w-full items-center flex-1 px-3  h-[calc(100vh-3.5rem)] overflow-y-auto">
      {/* Back */}
      <div
        className="sticky top-0 bg-white -mt-3 p-2 py-4 flex gap-5 px-6 items-center cursor-pointer text-2xl font-semibold w-full"
        onClick={() => window.history.back()}
      >
        <FaArrowLeft />
        <p>Post</p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <LoadingComp />
        </div>
      )}

      {/* Post */}
      {!isLoading && (
        <MainThread
          content={tweet?.text || ""}
          like={tweet?.total_likes || 0}
          id={tweet?.id ?? 0}
          name={tweet?.user.name || ""}
          username={tweet?.user.username || ""}
          picture_url={tweet?.user.image_url || ""}
        />
      )}

      <div className="w-full flex flex-col">
        {/* Thread */}
        {threads.map((thread, index) => (
          <ThreadCard
            key={index}
            count={threads.length}
            index={index + 1}
            content={thread.text}
            like={thread.total_likes}
            id={thread.id}
            name={thread.user.name}
            username={thread.user.username}
            picture_url={thread.user.image_url || ""}
          />
        ))}
      </div>

      {/* Replies */}
      <div className="w-full flex flex-col mt-4 gap-3">
        {replies.length > 0 && (
          <p className="font-semibold text-xl px-6 mb-2 text-gray-500">
            Replies
          </p>
        )}
        {replies.map((reply, index) => (
          <ReplyCard
            key={index}
            content={reply.text}
            like={reply.total_likes}
            id={reply.id}
            name={reply.user.name}
            username={reply.user.username}
            picture_url={reply.user.image_url || ""}
          />
        ))}
      </div>
    </div>
  );
}
