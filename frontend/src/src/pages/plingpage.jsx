import React, { useState, useEffect, useRef } from "react";
import PageLayout from "./pageLayout";

import { useSubscription } from "@apollo/client";

import { NEW_APPLICATION_SUBSCRIPTION } from "../requests/applicationRequests";

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

  const [applicationCount, setApplicationCount] = useState(0);
  
  //SUBSCRIPTION
  const Sub = useSubscription(NEW_APPLICATION_SUBSCRIPTION,{ onSubscriptionData: () => {PlingNow()}});
  
  
  //HOOKS
  const [playing, toggle] = useAudio("/plingsound.mp3");  //Play sound hook
  const playButtonRef = useRef(null);
  const [plingActive, setPlingActive] = useState(false);


  //FUNCTIONS
  function PlingNow(){
    if (plingActive){                 //You need to first have a "Start pling" button for the browser to allow the page to play sound
      playButtonRef.current.click();  //Works by using a ref to an invisible play-button below. This is a little hack to make it work :)
      setApplicationCount(applicationCount+1);
    };
  }

  return (
    <PageLayout>
      <div className="container pt-5" style={{textAlign:"center"}}>
        <p className="mb-0"style={{fontFamily:"Parisienne", fontSize: "50px"}}>Welcome to</p>
        <h1 style={{fontFamily:"Parisienne", fontSize: "120px"}}>The Pling</h1>
        <h1 style={{fontFamily:"Parisienne", fontSize: "70px", marginTop:"30px"}}>{applicationCount}</h1>
        <button value="test" ref={playButtonRef} onClick={toggle} style={{display:"none"}}> {playing ? "Pause" : "Play"} </button>
        <div className="mt-5">
        { plingActive ? <button className="btn btn-danger" onClick={() => setPlingActive(false)}>Stop pling</button> : <button className="btn btn-success" onClick={() => setPlingActive(true)}>Start pling</button>}
        </div>
      </div>
    </PageLayout>
  );
};

export default Pling;
