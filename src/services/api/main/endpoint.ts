export const MAIN_ENDPOINT = {
	Auth: {
		Login: "/user/login",
		CurrentUser: "/user/me",
		Register: "/user/register",
	},
	Profile: {
		GetProfile: "/user/me",
		UpdateProfile: "/user/update",
		GetProfileByUsername: "/user/:username",
	},
	Tweet: {
		GetTweet: "/post",
		GetTweetById: "/post/:id",
		GetTweetByUsername: "/user/:username/posts",
	},
	Like: {
		setLike: "/likes/:postId",
		removeLike: "/likes/:postId",
	},
};
