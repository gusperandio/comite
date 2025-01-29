import { useEffect } from "react";
import socket from "../socket/socket";
import toast from "react-hot-toast";
export const useSocketListeners = (onOpen: Function) => {
  useEffect(() => { 
    socket.on("approved", (data: string) => toast.success(data));
    socket.on("refused", (data: string) => toast.error(data));
    socket.on("noVote", (data: string) => toast(data, { icon: "⚠️" }));
    socket.on("showModal", () => onOpen());

    return () => {
      socket.off("message");
      socket.off("approved");
      socket.off("refused");
      socket.off("noVote");
      socket.off("showModal");
    };
  }, []);
};
