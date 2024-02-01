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

const fbPixelId = 967516697795046;

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
            client_ip_address: "49.151.103.24",
            client_user_agent: req.body.client_user_agent,
            fbp: req.body.fbp,
            fbc: req.body.fbc,
            em: req.body.em,
            // country: user_location?.country,
            // ct: user_location?.city,
            // st: user_location?.region,
            external_id: req.body.external_id,
          },
        },
      ],
      // test_event_code: req.body.isTest ? "TEST46387" : null,
      test_event_code: "TEST87200",
    };
    const fbGraphAPIVersion = "v19.0";
    const fbPixelId = 759662146057719;
    const accessToken =
      "EAAwkitiYFnYBO3zGv5zDnt8UomufZAKEeycEL3ZCfz1lPISHP0qJAdsptvJHGQ3mmtZALOXLp2UzNfAjxMotXrSArBUZARm6KC8qgHKTJZAwD5ovjjGr1W3zsjyTBihkoX8yefdoQ2okVLsLBKviuRHZAtM6654ZAZC5ypv2lFp1a6aKcOJRndqRkZANT4UsWxC6nawZDZD";
    const response = await fetch(
      `https://graph.facebook.com/${fbGraphAPIVersion}/${fbPixelId}/events?access_token=${accessToken}`,
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
