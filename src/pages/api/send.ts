import type { NextApiRequest, NextApiResponse } from "next";
export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  try {
    await fetch("https://fb-test-dedup.vercel.app/log", 
    // {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(req.body),
    // }
    );
    return res.status(200).send("data received");
  } catch (error) {
    console.log(error);
    return res.status(500).send("error");
  }
}
