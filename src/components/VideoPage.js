import './VideoPage.css';
import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

function RepositoryPage() {
  let { id } = useParams();
  const [response, setResponse] = useState();
  const isLoading = response === undefined;
  useEffect(
    () => {
      async function f() {
        const responses = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&key=AIzaSyAGpl45i0RE7QA3TsQGGp3_0GiQ3jKCFTM&id=${id}`, )
        let commits = await responses.json();
        console.log(id);
        setResponse(commits.items);
      }
      f();
    },
  []);

  if (!isLoading) {
    console.log(response);
    return (
      <div>
        <li><NavLink to={`/`}>Назад</NavLink></li>
        <div className='Background'>
          <iframe src={`http://www.youtube.com/embed/${id}`} width='560' height='315' frameborder='0' allowfullscreen></iframe>
          <div className='VideoTitle'> {response[0].snippet.title}</div>
          <a target="_blank" href={`https://www.youtube.com/channel/${response[0].snippet.channelId}`}>{response[0].snippet.channelTitle}</a>
          <div className='VideoDuration'> {response[0].contentDetails.duration}</div>
          <div className='VideoDescription'> {response[0].snippet.description}</div>
        </div>
      </div>
    )
  } else {
    return <div>Загрузка...</div>;
  }
}

export default RepositoryPage;