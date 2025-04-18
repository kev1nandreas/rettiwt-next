export type LoginProps = {
  username: string;
  password: string;
};

export type TweetProps = {
  text: string;
  parent_id: string | null;
}

export type RegisterProps = {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
};