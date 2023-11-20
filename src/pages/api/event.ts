import type { NextApiRequest, NextApiResponse } from "next";

interface IFacebookApiRequest extends NextApiRequest {
  body: {
    event_id: string;
    event_name: string;
    fbp: string;
    event_source_url: string;
    client_user_agent: string;
    em: string;
  };
}

export default async function Handler(
  req: IFacebookApiRequest,
  res: NextApiResponse
) {
  const testData = {
    data: [
      {
        action_source: "website",
        event_id: req.body.event_id,
        event_name: req.body.event_name,
        event_time: Math.floor(new Date().getTime() / 1000),
        event_source_url: req.body.event_source_url,
        user_data: {
          // client_ip_address: "49.150.125.200",
          client_user_agent: req.body.client_user_agent,
          fbp: req.body.fbp,
          em: req.body.em,
        },
      },
    ],
    // test_event_code: facebookAdsConfig.testId,
  };
  const response = await fetch(
    `https://graph.facebook.com/v18.0/967516697795046/events?access_token=EAAGLMKEeUCcBO3nXtJbC6lnjwMORuThMxkkZAI8o9e9zjlcIOWfrg8auwpmaCj1Dq0CAnUD6UURdWRrHhXxlkZBqoghZBM6l0AMcLvpcZAAVNhqSELd5cOdirGogrX0cBlypPqWjHSzIx3MmRp1UdCwL4DxHTaEl7D66hAoHhHUmsJwF2v8VddN8pseJVBmXaAZDZD`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    }
  );
  const data = await response.json();
  console.log(data);
  return res.status(200).json(data);
}
