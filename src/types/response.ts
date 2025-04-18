/* eslint-disable @typescript-eslint/no-explicit-any */
export type PaginationType = {
  Total: number;
  Limit: number;
  PageCurrent: number;
  PageTotal: number;
};

export type ResponseMeta<T> = {
  Message: string;
  Results: {
    Status: boolean;
    Data: T;
    Pagination?: PaginationType;
  };
};

interface ProfileResponse {
  id: string;
  name: string;
  username: string;
  image_url: string | null;
  bio: string | null;
}

interface TweetResponse {
  id: number;
  text: string;
  total_likes: number;
  parent_id: string | null;
  is_deleted: boolean;
  user: ProfileResponse;
}

interface TweetDetailResponse {
  id: number;
  text: string;
  total_likes: number;
  parent_id: string | null;
  is_deleted: boolean;
  user: ProfileResponse;
  replies: TweetResponse[];
}

export interface LoginResponse {
  token: string;
}

export function typecastLoginResponse(data: any): LoginResponse | undefined {
  return data as LoginResponse | undefined;
}

export function typecastProfileResponse(
  data: any
): ProfileResponse | undefined {
  return data as ProfileResponse | undefined;
}

export function typecastTweetResponse(data: any): TweetResponse[] | undefined {
  return data as TweetResponse[] | undefined;
}

export function typecastTweetDetailResponse(
  data: any
): TweetDetailResponse | undefined {
  return data as TweetDetailResponse | undefined;
}
