import React, { useState, useEffect } from "react";
import "./Home.css";
import { Paginator } from "./Paginator";
import { SearchBar } from "./SearchBar";
import { NavLink } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import { API_KEY } from "../constants";

const history = createBrowserHistory();
const localStorage = [];

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState();
  const [activePage, setActivePage] = useState(1);
  const isLoading = response === undefined;
  useEffect(() => {
    async function f() {
      let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&key=${API_KEY}&q=`;
      if (inputValue === "") {
        url += "обзор%20игры%20метрон";
      } else {
        url += inputValue;
      }
      let responses = await fetch(url);
      let commits = await responses.json();
      setResponse(commits.items);
    }
    f();
  }, []);

  if (!isLoading) {
    const videoList = [];
    let videoArr = response.slice((activePage - 1) * 10, activePage * 10 - 1);
    for (let i in videoArr) {
      videoList.push(
        <li>
          <NavLink to={`/video/${videoArr[i].id.videoId}`}>
            <div className="VideoButton">
              <img
                className="VideoPreview"
                src={videoArr[i].snippet.thumbnails.medium.url}
              />
              <div className="VideoTitle"> {videoArr[i].snippet.title}</div>
              <div className="ChannelTitle">
                {videoArr[i].snippet.channelTitle}
              </div>
              <div className="VideoDescription">
                {" "}
                {videoArr[i].snippet.description.slice(0, 99)}
              </div>
            </div>
          </NavLink>
        </li>
      );
    }
    return (
      <div>
        <SearchBar
          searchFilterOnChange={(e) => {
            setInputValue(e.target.value);
          }}
          value={inputValue}
          onSearchClick={() => {
            async function f() {
              let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&key=${API_KEY}&q=${inputValue}`;
              let responses = await fetch(url);
              let commits = await responses.json();
              setResponse(commits.items);
            }
            f();
            localStorage.push(inputValue);
          }}
        />

        <div className="SearchHistory">
          {localStorage.map(function (a) {
            return (
              <div
                onClick={() => {
                  async function f() {
                    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=${API_KEY}&q=${a}`;
                    let responses = await fetch(url);
                    let commits = await responses.json();
                    setResponse(commits.items);
                  }
                  f();
                  setInputValue(a);
                  for (var i = localStorage.length - 1; i >= 0; i--) {
                    if (localStorage[i] === a) {
                      localStorage.splice(i, 1);
                    }
                  }
                  localStorage.unshift(a);
                }}
              >
                {a}
              </div>
            );
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
