import React, { useEffect } from "react";
import { getDetail, useNowState, useNowDispatch } from "./MoviesContext";

const Detail = ({ match, history }) => {
  useEffect(() => {
    fetchData();
  }, []);

  const goBack = () => {
    history.goBack();
  };

  const { id } = match.params;

  const state = useNowState();
  const dispatch = useNowDispatch();

  const { data: movieDetail, loading, error } = state.detail;
  const fetchData = () => {
    getDetail(dispatch, id);
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러.</div>;
  if (!movieDetail) return null;

  const { title, poster_path, overview } = movieDetail;

  // 뒤로가기, 순위, 제목, 추천수, 영화내용
  return (
    <div>
      <button onClick={goBack}>뒤로가기</button>
      <strong>{title}</strong>
      <img
        className="movie_img"
        src={`https://image.tmdb.org/t/p/w500/` + poster_path}
        alt={title}
      />
      <em>{overview}</em>
    </div>
  );
};

export default Detail;
