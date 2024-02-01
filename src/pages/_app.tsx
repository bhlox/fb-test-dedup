import { getCookie } from "@/lib/util/cookies";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

// function createRandomUserId = (){
//   return cookie.set('userId',crypto.randomUUID())
// }

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("react-facebook-pixel")
      .then((mod) => mod.default)
      .then((pixel: any) => {
        pixel.init("759662146057719", {
          external_id: getCookie("userID"),
        });
      });
  }, []);
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

// BEFORE INITIALIZATION SCRIPT ( fbq('init', '{your-pixel-id-goes-here}');), CREATE OR GET RANDOM USERID. STORE IN COOKIE OR LOCAL STORAGE.
// //fbq('init', '<YOUR_PIXEL_ID>', {
//   'extern_id': <USERID>
// })
// const randomId
// fbq("track", "ViewContent", {}, { eventID: randomId });
