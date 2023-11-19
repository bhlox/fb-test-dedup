import { Inter } from "next/font/google";
import Script from "next/script";
import { useEffect, useId } from "react";
import { v4 } from "uuid";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function getCookie(name: string) {
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
  }
  return null;
}

export default function Home() {
  const pageViewEventId = v4();
  const viewContentEventId = v4();

  const handlePageView = () => {
    import("react-facebook-pixel")
      .then((mod) => mod.default)
      .then((pixel) => {
        pixel.fbq("track", "PageView", {}, { eventID: pageViewEventId });
      });
    setTimeout(() => {
      fetch("/api/pageView", {
        method: "POST",
        body: JSON.stringify({
          event_id: pageViewEventId,
          event_name: "PageView",
          fbp: getCookie("_fbp"),
          event_source_url: window.location.href,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }, 1000);
  };
  const handleViewContent = () => {
    // import("react-facebook-pixel")
    //   .then((mod) => mod.default)
    //   .then((pixel) => {
    //     pixel.init("967516697795046");
    //     pixel.fbq("track", "ViewContent", {}, { eventID: viewContentEventId });
    //   });
    fetch("/api/pageView", {
      method: "POST",
      body: JSON.stringify({
        event_id: viewContentEventId,
        event_name: "ViewContent",
        fbp: getCookie("_fbp"),
        event_source_url: window.location.href,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <button
            onClick={handlePageView}
            className="px-4 py-2 bg-white text-black text-xl"
          >
            PAGE VIEW BUTTON
          </button>
          <button
            onClick={handleViewContent}
            className="px-4 py-2 bg-white text-black text-xl"
          >
            VIEW CONTENT BUTTON
          </button>
        </div>
      </div>
    </>
  );
}
