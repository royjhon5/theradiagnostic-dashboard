"use client";

import Image from "next/image";
import theraLogo from "@/public/logo/logo.png";
import { Facebook, Globe, LogOut } from "lucide-react";
import ReactPlayer from "react-player";
import { Card } from "@/components/ui/card";
import useGetQue from "./hooks/useGetQue";
import { Button } from "@/components/ui/button";
import { useAppLoaderContext } from "@/components/providers/app-loader-provider";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useSound from "use-sound";
// Use the public folder for static assets like videos
const TheraVideo = "/logo/ads.mp4";
const queueSound = "/sound/que-sound/next-queue.mp3";
import { useCallback } from "react";
import useGetNowServing from "./hooks/useGetNowServing";
import { useSpeechSynthesis } from "react-speech-kit";
import { AppSocket } from "@/lib/socketClient";
export default function Que() {
  const router = useRouter();
  const { queData, refetchQue } = useGetQue();
  const socket = AppSocket();
  const { nowservingData, refetchServing, data } = useGetNowServing();
  const { setLoading } = useAppLoaderContext();
  const buttonClick = useRef<HTMLButtonElement>(null);
  const [play] = useSound(queueSound);
  const buttonToSpeak = useRef<HTMLButtonElement>(null);
  const { speak } = useSpeechSynthesis();
  const [value, setValue] = useState<string>("");
  const callButtonSpeak = useCallback(() => {
    if (data && data.response && data.response.length > 0) {
      setValue(
        "Now Serving," +
          "," +
          data.response[data.response.length - 1].priorityNo
      );
    }
    refetchServing();
    refetchQue();

    if (buttonClick.current) {
      buttonClick.current?.click();
    }
    setTimeout(() => {
      buttonClick.current?.click();
    }, 2000);
    setTimeout(() => {
      buttonToSpeak.current?.click();
    }, 3500);
  }, [refetchServing, refetchQue, data]);

  const handleQueueUpdate = useCallback(() => {
    refetchQue();
  }, [refetchQue]);

  const handleCalledQueueUpdate = useCallback(() => {
    callButtonSpeak();
  }, [callButtonSpeak]);

  useEffect(() => {
    socket.on("getQueue", handleQueueUpdate);
    socket.on("getCalledQueue", handleCalledQueueUpdate);
    return () => {
      socket.off("getQueue", handleQueueUpdate);
      socket.off("getCalledQueue", handleCalledQueueUpdate);
    };
  }, [handleQueueUpdate, handleCalledQueueUpdate, socket]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      if (res.ok) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (buttonClick.current) {
      buttonClick.current.click();
    }
  };

  const handleClickTwo = () => {
    if (buttonToSpeak.current) {
      buttonToSpeak.current.click();
    }
  };
  return (
    <div className="w-screen gap-2 h-screen flex flex-col">
      {/* Header */}
      <div className="w-full h-[10%] flex p-2">
        <div className="bg-background justify-between flex items-center w-full h-full shadow-md rounded-md p-5 border">
          <div className="flex flex-row gap-5 items-center">
            <Image alt="TheraLogo" src={theraLogo} height={50} width={40} />
            <div className="text-3xl font-semibold text-cyan-500">
              TheraDiagnostics
            </div>
          </div>
          <div className="text-right">
            <div className="text-cyan-500 font-semibold text-lg">
              June 19, 2025 | Thursday
            </div>
            <div className="text-cyan-500 font-bold text-xl">03:03 PM</div>
          </div>
        </div>
      </div>

      {/* Main content area (Sidebar + Content) */}
      <div className="flex flex-1 gap-[1%]">
        <div className="w-[60%] bg-background p-2">
          <div className="text-center text-5xl font-semibold p-2 bg-blue-500 rounded-lg text-white">
            NOW SERVING
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="text-center flex flex-col gap-4">
              <div className="text-2xl font-semibold">REGULAR</div>
              {nowservingData.slice(0, 3).map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden border-0 shadow-lg"
                >
                  <div className="bg-gradient-to-r from-cyan-400 to-teal-400 p-8 text-white">
                    <div className="text-lg font-medium mb-2">
                      QUEUE NUMBER:
                    </div>
                    <div className="text-5xl font-bold mb-4 tracking-wider">
                      {item.priorityNo}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="text-center text-2xl font-semibold">PRIORITY</div>
          </div>
        </div>
        <div className="flex-1 p-2 flex flex-col gap-2">
          <div className="h-[60%] p-2 bg-background shadow-md rounded-md border">
            <ReactPlayer
              className="react-player"
              url={TheraVideo}
              width="100%"
              height="100%"
              // playing={true}
              // loop={true}
            />
          </div>
          <div className="h-[40%]">
            <div className="text-center text-4xl font-semibold bg-blue-500 rounded-lg text-white">
              ON QUEUE
            </div>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {queData.slice(0, 16).map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden border-0 shadow-md"
                >
                  <div className="text-2xl text-center font-bold tracking-wider">
                    {item.priorityNo}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full h-[5%] bg-background flex items-center justify-between text-sm text-gray-600 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border-t">
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            className="cursor-pointer mr-2 border-0"
            onClick={handleLogout}
          >
            <LogOut />
          </Button>
          <Button hidden onClick={callButtonSpeak}></Button>
          <Button
            hidden
            ref={buttonToSpeak}
            onClick={() => speak({ text: value })}
          ></Button>
          <Button hidden onClick={handleClickTwo}></Button>
          <Button hidden ref={buttonClick} onClick={() => play()}>
            test
          </Button>
          <Button hidden onClick={handleClick}></Button>
          <span>Powered by:</span>
          <span className="text-cyan-500 font-medium">
            Repoint Solutions Inc.
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Globe className="w-4 h-4 text-cyan-500" />
            <span className="text-cyan-500">www.theradiagnostics.com</span>
          </div>
          <div className="flex items-center space-x-1">
            <Facebook className="w-4 h-4 text-cyan-500" />
            <span className="text-cyan-500">Theradiagnostics</span>
          </div>
        </div>
      </div>
    </div>
  );
}
