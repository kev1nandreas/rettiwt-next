/* eslint-disable @typescript-eslint/no-explicit-any */
import { setUsername } from "@/shared/toolkit/slice/username_slice";
import { type ClassValue, clsx } from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseFormData(data: any) {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
}

export const useUsername = () => {
  const username = useSelector((state: any) => state.username.Username);
  return username;
};

export const useSetUsername = () => {
  const dispatch = useDispatch();
  return (username: string) => {
    dispatch(setUsername(username));
  };
};