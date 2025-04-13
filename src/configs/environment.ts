export const ENV = {
	MODE: process.env.NEXT_PUBLIC_MODE,
	TOKEN_KEY: process.env.NEXT_PUBLIC_TOKEN_KEY || 'default_token_key',
	URI: {
	  BASE_URL: process.env.NEXT_PUBLIC_BASE_API_URL,
	},
  };