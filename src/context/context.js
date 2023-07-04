import React, { useState, useEffect, createContext } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext=createContext()
const GithubProvider=({children})=>{
    const [gitHubUser,setGitHubUser]=useState(mockUser)
    const [followers,settFollowers]=useState(mockFollowers)
    const [repos,setRepos]=useState(mockRepos)
    const [request,setRequest]=useState(0)
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState({show:false,msg:""})
    const searchGithubUser=async(user)=>{
        setLoading(true)
         toggleError()
        try {
            const resp=await axios(`${rootUrl}/users/${user}`)
            if(resp){
                setGitHubUser(resp.data)
                const {login,followers_url}=resp.data
                axios(`${rootUrl}/users/${login}/repos?per_page=100`)
                    .then((response)=>setRepos(response.data))
                    .then((err)=>console.log(err))
                axios(`${followers_url}?per_page=100`)
                    .then((response)=>settFollowers(response.data))
                    .then((err)=>console.log(err))

            }else{
                toggleError(true,'there is no github user with that username')
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            toggleError(true,'there is no github user with that username')
        }
        

    }
    const getRequests=()=>{
        setLoading(true)
        axios(`${rootUrl}/rate_limit`)
            .then(({data})=>{
                let{rate:{remaining}}=data
                setRequest(remaining)
                if(remaining === 0){
                    toggleError(true,'sorry, you have reached your hourly limit of  requests')
                }
                setLoading(false)
            })
            .catch((err)=>toggleError(true,'no user with that name'),setLoading(false))
    }
    useEffect(getRequests,[])
    function toggleError(show,msg){
        setError({show,msg})
    }
    return <GithubContext.Provider value={{loading,gitHubUser,followers,repos,request,error,searchGithubUser}}>
        {children}
    </GithubContext.Provider>
}
export {GithubContext,GithubProvider}