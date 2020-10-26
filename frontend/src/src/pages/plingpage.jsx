import React, { useState, useEffect, useRef } from "react";
import PageLayout from "./pageLayout";

import { GET_APPLICATION_COUNT, NEW_APPLICATION_SUBSCRIPTION } from "../requests/applicationRequests";

import { WebSocketLink } from '@apollo/client/link/ws';

import { useQuery, ApolloClient, InMemoryCache, useSubscription } from '@apollo/client';

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

  //HOOKS
  const [applicationCount, setApplicationCount] = useState(0);
  const [playing, toggle] = useAudio("/plingsound.mp3");  //Play sound hook
  const playButtonRef = useRef(null);
  const [plingActive, setPlingActive] = useState(false);

  const [secondPlingActive, setSecondPlingActive] = useState(false);
  const [secondPlingApplicationCount, setSecondPlingApplicationCount] = useState(0);

  //FUNCTIONS
  function PlingNow(){
    if (plingActive || secondPlingActive){      //You need to first have a "Start pling" button for the browser to allow the page to play sound
      playButtonRef.current.click();  //Works by using a ref to an invisible play-button below. This is a little hack to make it work :)
      setApplicationCount(applicationCount+1);
    };
  }

  let onHttp = window.location.protocol !== "https:";
  let message = onHttp ? "" : "You seem to be running the page in https. For the pling to work, you need to access this page with http. If this does not work, use the secondary pling.";
  let client = null;
  let wsLink = null;

  if (onHttp && plingActive) {
    wsLink = new WebSocketLink({               //For subscriptions (plingpage)
      uri: `ws://recruitment.isfit.org:5001/`,
      options: {
        reconnect: true
      }
    });
    
    client = new ApolloClient({   //Cache-policy is for specific situation when removing preferred interviewers in useradminpage
      cache: new InMemoryCache(),
      link: wsLink,
    });
  }
  
  //SUBSCRIPTION
  const Sub = useSubscription(NEW_APPLICATION_SUBSCRIPTION,{ onSubscriptionData: () => {PlingNow()}, client:client, skip:!plingActive});

  //QUERY
  const applicationCountQuery = useQuery(GET_APPLICATION_COUNT, {fetchPolicy: "no-cache", pollInterval:1000, skip:!secondPlingActive});
  let newTotalApplicationCount = applicationCountQuery?.data?.applications?.totalCount;


  useEffect(() => {
    if (newTotalApplicationCount !== undefined){
      if (secondPlingApplicationCount === 0 || newTotalApplicationCount < secondPlingApplicationCount){
        setSecondPlingApplicationCount(newTotalApplicationCount);
      }
      else if (newTotalApplicationCount > secondPlingApplicationCount){
        PlingNow();
        setSecondPlingApplicationCount(newTotalApplicationCount);
      }
    };
  }, [newTotalApplicationCount]);

  return (
    <PageLayout>
      <div className="container pt-5" style={{textAlign:"center"}}>
        <p className="mb-0"style={{fontFamily:"Parisienne", fontSize: "50px"}}>Welcome to</p>
        <h1 style={{fontFamily:"Parisienne", fontSize: "120px"}}>The Pling</h1>
        <h1 style={{fontFamily:"Parisienne", fontSize: "70px", marginTop:"30px"}}>{applicationCount}</h1>
        <button value="test" ref={playButtonRef} onClick={toggle} style={{display:"none"}}> {playing ? "Pause" : "Play"} </button>
        <p className="mb-0">{message}</p>
        <div className="mt-5">
        { plingActive ? <button className="btn btn-danger" onClick={() => setPlingActive(false)}>Stop pling</button> : <button className="btn btn-success" onClick={() => setPlingActive(true)}>Start pling</button>}
        </div>
        <div className="mt-5">
          { secondPlingActive ? <button className="btn btn-danger" onClick={() => setSecondPlingActive(false)}>Stop secondary pling</button> : <button className="btn btn-success" onClick={() => setSecondPlingActive(true)}>Start secondary pling</button>}
        </div>
        <p className="mb-0 mt-5">The second pling is in case the first one doesn't work. Both plings are not supposed to be active at the same time, but they probably can be.</p>
      </div>
    </PageLayout>
  );
};

export default Pling;
