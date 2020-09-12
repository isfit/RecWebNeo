import React, { useState, useEffect, useRef } from "react";
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
  const { data, error, loading, refetch } = useQuery(GET_APPLICATION_COUNT, {fetchPolicy: "no-cache",});

  const [playing, toggle] = useAudio("/plingsound.mp3");

  const playButtonRef = useRef(null);
  const [plingActive, setPlingActive] = useState(false);


  useEffect(() => {                         //Will just continue to run in a loop every 3 seconds, regardless of plingActive
    function RefetchApplicationCount() {
      refetch();
      if (plingActive){                 //If you have pressed the Start Pling button, it will play sound every time it loops
        playButtonRef.current.click();  //Works by using a ref to an invisible play-button below. This is a little hack to make it work :)
      };
    }
    RefetchApplicationCount();
    const interval = setInterval(() => RefetchApplicationCount(), 3000);
    return () => {
      clearInterval(interval);
    };
  }, [plingActive]);


  return (
    <PageLayout>
      <div>
        <p>Will just play the pling sound every three seconds for now</p>
        <button value="test" ref={playButtonRef} onClick={toggle} style={{display:"none"}}> {playing ? "Pause" : "Play"} </button>
        { plingActive ? <button onClick={() => setPlingActive(false)}>Stop pling</button> : <button onClick={() => setPlingActive(true)}>Start pling</button>}
      </div>
      <h1>CURRENT VALUE: {data?.applications?.totalCount}</h1>
    </PageLayout>
  );
};

export default Pling;
