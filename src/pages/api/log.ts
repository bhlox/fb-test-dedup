import type { NextApiRequest, NextApiResponse } from "next";
// import NextCors from "nextjs-cors";
export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   await NextCors(req, res, {
  //     methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  //     origin: "*",
  //     optionsSuccessStatus: 200,
  //   });
  console.log("api accessed");
  console.log(req.body);
  return res.status(200).send("data received");
}
