import React, { useState, useEffect } from "react";
import PageLayout from "./pageLayout";

import { useQuery } from "@apollo/client";

import { GET_APPLICATION_COUNT } from "../requests/applicationRequests";
import { wait } from "@testing-library/react";

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
  
    const toggle = () => setPlaying(!playing);
  
    useEffect(() => {
        playing ? audio.play() : audio.pause();
      },
      [playing]
    );
  
    useEffect(() => {
      audio.addEventListener('ended', () => setPlaying(false));
      return () => {
        audio.removeEventListener('ended', () => setPlaying(false));
      };
    }, []);
  
    return [playing, toggle];
  };


const Pling = () => {
  const { data, error, loading, refetch } = useQuery(GET_APPLICATION_COUNT, {
    fetchPolicy: "no-cache",
  });
  const [prevValue, setPrevValue] = useState(0);

  const [playing, toggle] = useAudio("/plingsound.mp3");

  useEffect(() => {
    function RefetchApplicationCount() {
      setPrevValue(data?.applications?.totalCount);
      refetch();
    }
    RefetchApplicationCount();
    const interval = setInterval(() => RefetchApplicationCount(), 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  

  return (
    <PageLayout>
      <div>
        <button onClick={toggle}>{playing ? "Pause" : "Play"}</button> //Lyd fungerer med knapp, men får ikke kalle .play() i useAudio av nettleseren
      </div>
      <h1>PREV VALUE: {prevValue}</h1>
      <h1>CURRENT VALUE: {data?.applications?.totalCount}</h1>
    </PageLayout>
  );
};

export default Pling;
