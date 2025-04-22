/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { del, get, post, put } from "@/services/api/main/call";
import { MAIN_ENDPOINT } from "@/services/api/main/endpoint";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export const useFetchTweet = (
  per_page: number,
  page: number,
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) => {
      const { Kind, OK } = await get(MAIN_ENDPOINT.Tweet.GetTweet, {
        per_page,
        page: pageParam,
      });
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return { Kind, nextPage: pageParam + 1 };
    },
    queryKey: ["fetch.tweets.infinite", per_page],
    refetchInterval: 20000,
    initialPageParam: page,
    getNextPageParam: (lastPage) =>
      lastPage.nextPage >
      (lastPage.Kind as { meta: { max_page: number } }).meta.max_page
        ? undefined
        : lastPage.nextPage,
  }) as any;
};

export const useFetchTweetbyUsername = (
  username: string,
  per_page: number,
  page: number,
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useQuery({
    queryFn: async () => {
      const { Kind, OK } = await get(
        MAIN_ENDPOINT.Tweet.GetTweetByUsername.replace(":username", username),
        {
          per_page,
          page,
        }
      );
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    queryKey: ["fetch.tweets.byUsername", username],
  }) as any;
};

export const useFetchTweetbyId = (
  id: string,
  per_page: number,
  page: number,
  search?: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useQuery({
    queryFn: async () => {
      const { Kind, OK } = await get(
        MAIN_ENDPOINT.Tweet.GetTweetById.replace(":id", id.toString()),
        {
          page,
          per_page,
          search,
        }
      );
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    queryKey: ["fetch.tweets.byId", id],
  }) as any;
};

export const useNewTweet = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (body: FormData) => {
      const { Kind, OK } = await post(MAIN_ENDPOINT.Tweet.GetTweet, body);
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    mutationKey: ["new.tweet"],
    onSuccess,
    onError,
  });
};

export const useUpdateTweet = ({
  id,
  onSuccess,
  onError,
}: {
  id: number;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (body: FormData) => {
      const { Kind, OK } = await put(
        MAIN_ENDPOINT.Tweet.GetTweet + "/" + id,
        body
      );
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    mutationKey: ["update.tweet"],
    onSuccess,
    onError,
  });
};

export const useDeleteTweet = ({
  id,
  onSuccess,
  onError,
}: {
  id: number;
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async () => {
      const { Kind, OK } = await del(MAIN_ENDPOINT.Tweet.GetTweet + "/" + id);
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    mutationKey: ["delete.tweet"],
    onSuccess,
    onError,
  });
};
