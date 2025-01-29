import { Loader } from "@/components/loader";
import { useEffect, useState } from "react";

interface TimerProps {
  onClose: () => void;
}


export function Timer(props: TimerProps){
  const [time, setTime] = useState(7);

  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (time === 0) {
      props.onClose();
      // socket.emit("noVote", userName);
      return;
    }
  }, [time]);

  return (
    <div className="flex flex-row items-center justify-start gap-4">
      <Loader /> 00:{String(time).padStart(2, "0")}
    </div>
  );
}