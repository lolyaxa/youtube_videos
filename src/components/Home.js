import React, { useState, useEffect } from 'react';
import './Home.css';
import { Paginator } from './Paginator';
import { SearchBar } from './SearchBar';
import { NavLink } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();
const CashArr = [];

function Home() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState();
  const [activePage, setActivePage] = useState(1);
  const isLoading = response === undefined;
  useEffect(
    () => {
      async function f() {
        let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=AIzaSyDxDqDp328CXFtTj6XYVwIa4WKUH-YT6UI&q=';
        if (inputValue === '') {
          url += 'обзор%20игры%20метрон';
        } else {
          url += inputValue;
        }
        let responses = await fetch(url);
        let commits = await responses.json();
        setResponse(commits.items);
        
      }
      f();
    },
  []);

  if(!isLoading) {
    const videoList = [];
    let videoArr = response.slice(((activePage -1) * 10), (activePage * 10 - 1))
    for (let i in videoArr) {
      videoList.push(
        <li><NavLink to={`/video/${videoArr[i].id.videoId}`}>
          <div className='VideoButton'>
            <img className='VideoPreview' src={videoArr[i].snippet.thumbnails.medium.url}/>
            <div className='VideoTitle'> {videoArr[i].snippet.title}</div>
            <div className='ChannelTitle'>{videoArr[i].snippet.channelTitle}</div>
            <div className='VideoDescription'> {videoArr[i].snippet.description.slice(0, 99)}</div>            
          </div>
        </NavLink></li>)
    }
        return (
          <div>
            <SearchBar
              searchFilterOnChange={(e) =>
              {
                setInputValue(e.target.value)
              }}
              value={inputValue}
              onSearchClick={() =>
              {
                async function f() {
                  let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=AIzaSyDxDqDp328CXFtTj6XYVwIa4WKUH-YT6UI&q=${inputValue}`;
                  let responses = await fetch(url);
                  let commits = await responses.json();
                  setResponse(commits.items);
                }
                f();
                CashArr.push(inputValue);
              }}
            />

            <div className='SearchHistory'>
              {CashArr.map(function(a) {
                return <div
                  onClick={() =>
                    {
                      async function f() {
                        let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=AIzaSyDxDqDp328CXFtTj6XYVwIa4WKUH-YT6UI&q=${a}`;
                        let responses = await fetch(url);
                        let commits = await responses.json();
                        setResponse(commits.items);
                      }
                    f();
                    setInputValue(a);
                    for(var i = CashArr.length - 1; i >= 0; i--) {
                      if(CashArr[i] === a) {
                         CashArr.splice(i, 1);
                      }
                    }
                    CashArr.unshift(a);
                    }}>{a}</div>
              })}
            </div>

            <div>{videoList}</div>

            <Paginator
              total={response.length}
              perPage={10}
              activePage={activePage}
              onSelect={(pageNumber) => {
                setActivePage(pageNumber);
              }}
            />
          </div>
        );
  } else {
    return <div>Загрузка...</div>;
  }
}

export default Home;