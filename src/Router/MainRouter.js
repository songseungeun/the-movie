import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "../Main";
import Movies from "../Movies";
import About from "../About";
import TopBoxOffice from "../TopBoxOffice";
import Upcoming from "../Upcoming";
import Search from "../Search";
import Detail from "../Detail";

const MainRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/now" component={Movies} />
      <Route exact path="/topboxoffice" component={TopBoxOffice} />
      <Route exact path="/upcoming" component={Upcoming} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/about" component={About} />
      <Route exact path="/now/:id" component={Detail} />
      <Route
        render={({ location }) => (
          <div>
            <h2>이 페이지는 존재하지 않습니다.</h2>
            <p>{location.pathname}</p>
          </div>
        )}
      />
    </Switch>
  );
};

export default MainRouter;
