import React from "react";
import { Link } from "react-router-dom";
import { NowProvider } from "./MoviesContext";
import styled, { createGlobalStyle } from "styled-components";
import MainRouter from "./Router/MainRouter";

const GlobalStyle = createGlobalStyle`
    body * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      list-style: none;
    }
  `;

const MoviesWrapper = styled.div`
  width: 100%;

  background: #f4f4f4;
`;

const MoviesHeadBlock = styled.div`
  h1 {
    padding: 15px;
    text-align: center;
  }
  ul {
    background: #ccc;
    display: flex;
  }
  li {
  }
  li > a {
    padding: 15px 20px;

    display: block;

    font-size: 18px;
    font-weight: bold;

    color: #fff;
    text-decoration: none;
  }
`;

const MovieListBlock = styled.div`
  width: 90%;

  margin: 0 auto;

  h1 {
    padding: 10px;

    font-size: 25px;
    text-align: center;
  }
`;

function App() {
  return (
    <NowProvider>
      <GlobalStyle />
      <MoviesWrapper>
        <MoviesHeadBlock>
          <h1>the movie</h1>
          <ul>
            <li>
              <Link to="/now">Now Playing</Link>
            </li>
            <li>
              <Link to="/topboxoffice">Top Box Office</Link>
            </li>
            <li>
              <Link to="/upcoming">Upcoming</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </MoviesHeadBlock>
        <MovieListBlock>
          <MainRouter />
        </MovieListBlock>
      </MoviesWrapper>
    </NowProvider>
  );
}

export default App;
