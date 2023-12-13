import type { NextApiRequest, NextApiResponse } from "next";

interface IFacebookApiRequest extends NextApiRequest {
  body: {
    event_id: string;
    event_name: string;
    fbp: string;
    fbc: string | null;
    event_source_url: string;
    client_user_agent: string;
    em: string;
    isTest: boolean;
    external_id: string;
  };
}

type user_locationType = {
  ip: string;
  city: string;
  country: string;
  region: string;
};

export default async function Handler(
  req: IFacebookApiRequest,
  res: NextApiResponse
) {
  try {
    const cookies = req.cookies;
    let user_location: user_locationType | null = null;
    if (cookies["user_location"]) {
      user_location = JSON.parse(cookies["user_location"]);
    }
    const testData = {
      data: [
        {
          action_source: "website",
          event_id: req.body.event_id,
          event_name: req.body.event_name,
          event_time: Math.floor(new Date().getTime() / 1000),
          event_source_url: req.body.event_source_url,
          user_data: {
            client_ip_address: user_location?.ip,
            client_user_agent: req.body.client_user_agent,
            fbp: req.body.fbp,
            fbc: req.body.fbc,
            em: req.body.em,
            country: user_location?.country,
            ct: user_location?.city,
            st: user_location?.region,
            external_id: req.body.external_id,
          },
        },
      ],
      test_event_code: req.body.isTest ? "TEST46387" : null,
    };
    const response = await fetch(
      `https://graph.facebook.com/v18.0/967516697795046/events?access_token=${process.env.FB_ACCESS_TOKEN}`,
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
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
