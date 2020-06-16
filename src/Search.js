import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getSearch, useNowState, useNowDispatch } from "./MoviesContext";
import styled from "styled-components";

const InsertForm = styled.form``;
const Input = styled.input`
  width: 100%;

  padding: 10px;

  font-size: 16px;
`;

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

const Search = () => {
  const [keyword, setKeyword] = useState("");

  const initialState = [
    { id: 1, keyword: "blue" },
    { id: 2, keyword: "green" },
  ];

  const [keywordList, setKeywordList] = useState(initialState);

  const onChange = ({ target }) => setKeyword(target.value);

  const state = useNowState();
  const dispatch = useNowDispatch();

  const { data: searchList, loading, error } = state.search;

  // 키워드 클릭 했을 때 검색
  async function KeySearch(keyword) {
    await fetchData(keyword);
  }

  const KeyRemove = (id) => {
    setKeywordList(keywordList.filter((key) => key.id !== id));
  };

  async function fetchData(keyword) {
    try {
      await getSearch(dispatch, keyword);
    } catch (e) {
      throw new Error(`error: ${e}`);
    }
  }

  function onSubmit(e) {
    e.preventDefault();

    fetchData(keyword);
    const keywordItem = {
      id: nextId.current,
      keyword,
    };

    setKeywordList([...keywordList, keywordItem]);
    nextId.current += 1;
    setKeyword("");
  }

  const nextId = useRef(3);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러.</div>;
  // if (!searchList) return null;

  return (
    <div>
      <h1>Search</h1>
      <InsertForm onSubmit={onSubmit}>
        <Input placeholder="Search" onChange={onChange} autoFocus />
      </InsertForm>
      {keywordList ? (
        <SearchHistory
          keywordList={keywordList}
          setKeywordList={setKeywordList}
          KeyRemove={KeyRemove}
          KeySearch={KeySearch}
        />
      ) : null}
      {searchList ? <SearchList searchList={searchList} /> : null}
    </div>
  );
};

const SearchHistoryBlock = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const KeywordItem = styled.li`
  padding: 10px 15px;
  margin: 10px 5px;

  background: #ccc;
  color: #fff;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
`;

const RemoveBtn = styled.div`
  padding: 5px;
  display: inline-block;
  margin-left: 5px;
  font-weight: normal;
  color: #000;
  cursor: pointer;
`;

const SearchHistory = ({ keywordList, KeyRemove, KeySearch }) => {
  return (
    <div>
      <SearchHistoryBlock>
        {keywordList.map(({ id, keyword }) => (
          <KeywordItem id={id} key={id} onClick={() => KeySearch(keyword)}>
            {keyword}
            <RemoveBtn onClick={() => KeyRemove(id)}>X</RemoveBtn>
          </KeywordItem>
        ))}
      </SearchHistoryBlock>
    </div>
  );
};

const SearchList = ({ searchList }) => {
  return (
    <>
      <h1>search result</h1>
      <MovieList>
        {searchList.map(({ id, title, poster_path }) => (
          <>
            <MovieItem id={id} key={id}>
              <Link to={"/now/" + id} key={`search` + id}>
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

export default Search;
