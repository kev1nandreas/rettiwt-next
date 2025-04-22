/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { IoMdSend } from "react-icons/io";
import PostCard from "@/components/Card/PostCard";
import { useFetchTweet, useNewTweet } from "@/app/(main)/api/useTweet";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { TweetProps } from "@/types/FormProps";
import toast from "react-hot-toast";
import LoadingComp from "@/components/Loading";
import { useGetPicture } from "@/lib/utils";
import { ENV } from "@/configs/environment";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function MainSection() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const {
    data,
    refetch,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useFetchTweet(limit, page);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tweets = data?.pages || [];
  const methods = useForm<TweetProps>();
  const { register, reset } = methods;
  const picture = useGetPicture();

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  useEffect(() => {
    console.log("Tweets", data);
  }, [tweets, data]);

  const mutation = useNewTweet({
    onSuccess: () => {
      toast.success("Tweet created successfully!");
      setPage(1);
      refetch();
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit: SubmitHandler<TweetProps> = async (post: any) => {
    await mutation.mutateAsync(post);
  };

  return (
    <div className="p-3 flex flex-col gap-5 w-full h-[calc(100vh-3.5rem)] overflow-y-auto flex-1">
      {/* What do you think */}
      <div className="bg-white p-3 rounded-lg flex flex-col gap-2">
        <h4 className="font-semibold w-full pb-2 px-3 border-b-[1px] border-slate-300">
          Post Something
        </h4>
        <div className="flex items-center gap-2">
          {picture ? (
            <Image
              src={ENV.URI.BASE_IMAGE_URL + picture}
              alt={picture}
              width={100}
              height={100}
              draggable={false}
              className="md:w-[2.5rem] md:h-[2.5rem] hidden md:block rounded-full md:m-2 pointer-events-none select-none"
            />
          ) : (
            <Image
              src={"/female-ava.png"}
              alt={"avatar"}
              width={100}
              height={100}
              draggable={false}
              className="md:w-[2.5rem] md:h-[2.5rem] hidden md:block rounded-full md:m-2 pointer-events-none select-none"
            />
          )}

          {/* Send Data Short */}
          <FormProvider {...methods}>
            <form
              className="w-full flex gap-2 items-center"
              onSubmit={methods.handleSubmit(handleSubmit)}
            >
              <input
                id="text"
                type="text"
                placeholder="What do you think?"
                autoComplete="off"
                className="w-full h-[2rem] rounded-lg px-2 focus:outline-none"
                {...register("text", {
                  required: "This field is required",
                  minLength: {
                    value: 1,
                    message: "Minimum length is 1 character",
                  },
                  maxLength: {
                    value: 1000,
                    message: "Maximum length is 1000 characters",
                  },
                })}
              />
              <button
                type="submit"
                className="bg-blue-800 text-white text-lg font-semibold rounded-xl p-3 flex gap-3 justify-center items-center hover:bg-blue-700 transition-all duration-200 ease-in-out cursor-pointer"
              >
                <IoMdSend className="text-lg" />
              </button>
            </form>
          </FormProvider>
        </div>
      </div>

      {/* Post */}
      {/* Initial Loading */}
      {isLoading && tweets.length === 0 && <LoadingComp />}

      {/* Posts List */}
      <div className="flex flex-col gap-4 w-full">
        {tweets.map((page: { Kind: { data: any[] } }) =>
          page.Kind.data.map(
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
          )
        )}
      </div>

      {/* Observer and load more indicator */}
      <div ref={ref} className="h-8 flex justify-center">
        {isFetchingNextPage && hasNextPage && (
          <div className="text-sm text-gray-500">Loading more posts...</div>
        )}
        {!hasNextPage && tweets.length > 0 && (
          <div className="text-sm text-gray-500">No more posts to load</div>
        )}
      </div>
    </div>
  );
}
