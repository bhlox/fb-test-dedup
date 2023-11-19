import { FacebookAdsApi } from "facebook-nodejs-business-sdk";

export const facebookAdsConfig = {
  accessToken:
    "EAAGLMKEeUCcBO3nXtJbC6lnjwMORuThMxkkZAI8o9e9zjlcIOWfrg8auwpmaCj1Dq0CAnUD6UURdWRrHhXxlkZBqoghZBM6l0AMcLvpcZAAVNhqSELd5cOdirGogrX0cBlypPqWjHSzIx3MmRp1UdCwL4DxHTaEl7D66hAoHhHUmsJwF2v8VddN8pseJVBmXaAZDZD",
  pixelId: 967516697795046 ?? "",
  testId: process.env.FACEBOOK_TEST_ID ?? "",
};

export function initializeFacebookAdsApi() {
  const { accessToken } = facebookAdsConfig;
  const fbApi = FacebookAdsApi.init(accessToken);
  return fbApi;
}

export const fbApiURL = `https://graph.facebook.com/18.0/${facebookAdsConfig.pixelId}/events?access_token=${facebookAdsConfig.accessToken}`;
