import { Inter } from "next/font/google";
import Script from "next/script";
import { FormEvent, useEffect, useId, useRef } from "react";
import { v4 } from "uuid";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { sha256 } from "js-sha256";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const handlePageView = () => {
    const eventID = v4();
    import("react-facebook-pixel")
      .then((mod) => mod.default)
      .then((pixel) => {
        pixel.fbq("track", "PageView", {}, { eventID });
      });
    setTimeout(() => {
      fetch("/api/event", {
        method: "POST",
        body: JSON.stringify({
          event_id: eventID,
          client_user_agent: navigator.userAgent,
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
    const eventID = v4();
    import("react-facebook-pixel")
      .then((mod) => mod.default)
      .then((pixel) => {
        // pixel.init("967516697795046");
        pixel.fbq("track", "ViewContent", {}, { eventID });
      });
    fetch("/api/event", {
      method: "POST",
      body: JSON.stringify({
        event_id: eventID,
        event_name: "ViewContent",
        fbp: getCookie("_fbp"),
        event_source_url: window.location.href,
        client_user_agent: navigator.userAgent,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current?.value) {
      alert("pls enter an email");
      return;
    }

    const eventID = v4();
    import("react-facebook-pixel")
      .then((mod) => mod.default)
      .then((pixel) => {
        // pixel.init("967516697795046");
        pixel.fbq("track", "Lead", {}, { eventID });
      });
    fetch("/api/event", {
      method: "POST",
      body: JSON.stringify({
        event_id: eventID,
        event_name: "Lead",
        fbp: getCookie("_fbp"),
        event_source_url: window.location.href,
        client_user_agent: navigator.userAgent,
        em: sha256(inputRef.current?.value),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center max-w-7xl p-4 mx-auto space-y-4 bg-black">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePageView}
            className="px-4 py-2 bg-white text-black text-xl rounded-xl"
          >
            PAGE VIEW BUTTON
          </button>
          <button
            onClick={handleViewContent}
            className="px-4 py-2 bg-white text-black text-xl rounded-xl"
          >
            VIEW CONTENT BUTTON
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            ref={inputRef}
            type="email"
            placeholder="enter email"
            className="px-4 py-2 rounded-lg text-black bg-white"
          />
          <button
            type="submit"
            className="bg-white px-4 py-2 text-black rounded-xl"
          >
            Submit Lead
          </button>
        </form>
      </div>
    </>
  );
}
