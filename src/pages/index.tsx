import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { v4 } from "uuid";
import { sha256 } from "js-sha256";
import { getCookie, setCookie } from "@/lib/util/cookies";
import { isIOS, isMacOs } from "react-device-detect";

export default function Home() {
  const pageViewRefBtn = useRef<HTMLButtonElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const isIOSDevice = isIOS || isMacOs;

  const handlePageView = () => {
    const eventID = v4();

    if (!isIOSDevice) {
      import("react-facebook-pixel")
        .then((mod) => mod.default)
        .then((pixel) => {
          pixel.fbq("track", "PageView", {}, { eventID });
        });
    }
    // setTimeout is used because when invoking your first fbq tracking event, it would then create the _fbp cookie IF isn't created yet. and when the _fbp cookie is still being created by the fbq, we have to wait at least a second before sending all available CAPI event parameters along with the created fbp. this applies to _fbc cookie as well.
    setTimeout(() => {
      fetch("/api/event", {
        method: "POST",
        body: JSON.stringify({
          event_id: eventID,
          client_user_agent: navigator.userAgent,
          event_name: "PageView",
          fbp: getCookie("_fbp"),
          event_source_url: window.location.href,
          isTest: checkboxRef.current?.checked,
          external_id: getCookie("userID"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }, 1000);
  };

  const handleViewContent = () => {
    const eventID = v4();
    if (!isIOSDevice) {
      import("react-facebook-pixel")
        .then((mod) => mod.default)
        .then((pixel) => {
          pixel.fbq("track", "ViewContent", {}, { eventID });
        });
    }
    fetch("/api/event", {
      method: "POST",
      body: JSON.stringify({
        event_id: eventID,
        event_name: "ViewContent",
        fbp: getCookie("_fbp"),
        event_source_url: window.location.href,
        client_user_agent: navigator.userAgent,
        external_id: getCookie("userID"),
        isTest: checkboxRef.current?.checked,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleSubmitLead = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current?.value) {
      alert("pls enter an email");
      return;
    }

    const eventID = v4();
    if (!isIOSDevice) {
      import("react-facebook-pixel")
        .then((mod) => mod.default)
        .then((pixel) => {
          pixel.fbq("track", "Lead", {}, { eventID });
        });
    }
    fetch("/api/event", {
      method: "POST",
      body: JSON.stringify({
        event_id: eventID,
        event_name: "Lead",
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
        event_source_url: window.location.href,
        client_user_agent: navigator.userAgent,
        em: sha256(inputRef.current?.value),
        isTest: checkboxRef.current?.checked,
        external_id: getCookie("userID"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setSubmitted(true);
  };

  useEffect(() => {
    if (!getCookie("userID")) {
      setCookie("userID", v4(), 90);
    }
    // pageViewRefBtn.current?.click();
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center max-w-7xl p-4 mx-auto space-y-4 bg-black">
        {/* <div className="flex gap-2">
          <input ref={checkboxRef} type="checkbox" name="test" id="test" />
          <label htmlFor="test" className="text-white">
            test mode
          </label>
        </div> */}
        <div className="flex items-center justify-center gap-4">
          <button
            ref={pageViewRefBtn}
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
        <form onSubmit={handleSubmitLead} className="flex flex-col space-y-4">
          <input
            ref={inputRef}
            type="email"
            placeholder="enter email"
            className="px-4 py-2 rounded-lg text-black bg-white"
          />
          <button
            type="submit"
            disabled={submitted}
            className={`${
              submitted ? "bg-green-400 text-white" : "bg-white text-black"
            } px-4 py-2 rounded-xl`}
          >
            {submitted ? "Submitted Lead" : "Submit lead"}
          </button>
        </form>
      </div>
    </>
  );
}
