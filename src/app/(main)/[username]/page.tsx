"use client";

import ProfileHeader from "@/containers/ProfileHeader";
import { useFetchTweetbyUsername } from "../api/useTweet";
import { typecastTweetResponse } from "@/types/response";
import PostCard from "@/components/Card/PostCard";
import { useParams } from "next/navigation";
import LoadingComp from "@/components/Loading";

export default function Profile() {
  const username = useParams().username;
  const { data, isLoading } = useFetchTweetbyUsername(username as string, 50, 1);
  const tweets = typecastTweetResponse(data?.data);

  return (
    <div className="flex flex-col gap-5 w-full items-center flex-1 p-3 h-[calc(100vh-3.5rem)] overflow-y-auto">
      <ProfileHeader />

      {/* Loading */}
      {isLoading && <LoadingComp />}

      {/* No Post */}
      {!isLoading && tweets?.filter((tweet) => !tweet.is_deleted).length === 0 && (
        <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
          <p className="text-xl opacity-20 font-semibold">No Post Yet...</p>
        </div>
      )}

      {/* Post Card */}
      <div className="flex flex-col gap-4 w-full">
        {tweets?.map(
          (tweet) =>
            !tweet.is_deleted && (
              <PostCard
                key={tweet.id}
                content={tweet.text}
                like={tweet.total_likes}
                id={tweet.id}
                name={tweet.user.name}
                username={tweet.user.username}
                picture_url={tweet.user.image_url || ""}
              />
            )
        )}
      </div>
    </div>
  );
}
