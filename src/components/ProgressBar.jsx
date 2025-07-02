import { useEffect, useState } from "react";

const ProgressBar = ({ timer, interval }) => {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevState) => prevState - interval);
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return <progress value={remainingTime} max={timer} />;
};

export default ProgressBar;
