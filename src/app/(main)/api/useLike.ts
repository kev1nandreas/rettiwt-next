import { put, del } from "@/services/api/main/call";
import { MAIN_ENDPOINT } from "@/services/api/main/endpoint";
import { useMutation } from "@tanstack/react-query";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useSetLike = ({
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
        MAIN_ENDPOINT.Like.setLike.replace(":postId", id.toString()),
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
    mutationKey: ["set.like"],
    onSuccess,
    onError,
  });
};

export const useDeleteLike = ({
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
      const { Kind, OK } = await del(
        MAIN_ENDPOINT.Like.removeLike.replace(":postId", id.toString())
      );
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    mutationKey: ["delete.like"],
    onSuccess,
    onError,
  });
};
