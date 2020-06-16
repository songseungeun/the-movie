import React, { useEffect } from "react";
import { useNowState, useNowDispatch, getTop } from "./MoviesContext";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MovieList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const MovieItem = styled.li`
  width: calc(25% - 20px);

  padding: 10px;
  margin: 10px;

  text-align: center;

  cursor: pointer;

  img {
    width: 100%;
  }
`;

const TopBoxOffice = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const state = useNowState();
  const dispatch = useNowDispatch();

  const { data: topList, loading, error } = state.top;

  const fetchData = () => {
    getTop(dispatch);
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러.</div>;
  if (!topList) return null;

  // console.log(topList);
  return (
    <>
      <h1>Top Box Office</h1>
      <MovieList>
        {topList.map(({ id, title, poster_path }) => (
          <>
            <MovieItem id={id} key={id}>
              <Link to={"/now/" + id} key={`link` + id}>
                <strong>{title}</strong>
                <img
                  className="movie_img"
                  src={`https://image.tmdb.org/t/p/w500/` + poster_path}
                  alt={title}
                />
              </Link>
            </MovieItem>
          </>
        ))}
      </MovieList>
    </>
  );
};

export default TopBoxOffice;
