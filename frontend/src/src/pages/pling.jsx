import React, { useEffect, useState } from 'react'
import './pling.css'
import useSound from 'use-sound'
import mlgAirhorn from './mlg-airhorn.mp3'
import plingSfx from './pling.wav'
import { WebSocketLink } from '@apollo/client/link/ws'
import { ApolloClient, InMemoryCache, useQuery, useSubscription } from '@apollo/client'
import { GET_APPLICATION_COUNT, NEW_APPLICATION_SUBSCRIPTION } from '../requests/applicationRequests'

export default function PlingFest() {

    const wsLink = new WebSocketLink({
        uri: 'ws://recruitment.isfit.org:5001/',
    })
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: wsLink,
    })

    const applicationsQuery = useQuery(GET_APPLICATION_COUNT, {
        fetchPolicy: "no-cache",
        pollInterval:1000,
    })

    let plingCount = 0
    const [playGong] = useSound(plingSfx)
    const [playMlg] = useSound(mlgAirhorn)

    useEffect(() => {
        const interval = setInterval(() => {
            const applicationCount = applicationsQuery?.data?.applications?.totalCount

            console.log(applicationCount)
            console.log(plingCount)

            if (applicationCount !== undefined) {
                if (applicationCount !== plingCount) {
                    if (applicationCount - plingCount >= 5) {
                        playMlg()
                    } else {
                        playGong()
                    }
                }
            }
            
            plingCount = applicationCount
        }, 7000)
    })

    return(
        <div className='pling-container'>
            <h1>Plingfest 2022</h1>
        </div>
    )
}