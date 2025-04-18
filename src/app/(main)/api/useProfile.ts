/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MAIN_ENDPOINT } from "@/services/api/main/endpoint";
import { useMutation, useQuery } from "@tanstack/react-query";
import { get, patch } from "@/services/api/main/call";

export const useFetchProfileInfo = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useQuery({
    queryFn: async () => {
      const { Kind, OK, StatusCode } = await get(
        MAIN_ENDPOINT.Profile.GetProfile
      );
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    queryKey: ["fetch.profile.info"],
  }) as any;
};

export const useFetchProfileByUsername = (
  username: string,
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useQuery({
    queryFn: async () => {
      const { Kind, OK, StatusCode } = await get(
        MAIN_ENDPOINT.Profile.GetProfileByUsername.replace(":username", username)
      );
      if (!OK) {
        throw new Error(
          (Kind as { message: string }).message ||
            (Kind as { Message: string }).Message
        );
      }
      return Kind;
    },
    queryKey: ["fetch.profile.username", username],
  }) as any;
};

export const useUpdateProfile = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (body: FormData) => {
      const { Kind, OK } = await patch(
        MAIN_ENDPOINT.Profile.UpdateProfile,
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