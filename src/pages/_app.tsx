import { getCookie } from "@/lib/util/cookies";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { AdvancedMatching } from "react-facebook-pixel";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("react-facebook-pixel")
      .then((mod) => mod.default)
      .then((pixel: any) => {
        pixel.init("967516697795046", {
          external_id: getCookie("userID"),
        });
      });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
