import React from "react";
import { Route, Switch } from "react-router-dom";
import Detail from "../Detail";

const SubRouter = () => {
  return (
    <Switch>
      <Route path="/now/:id" component={Detail} />
    </Switch>
  );
};

export default SubRouter;
