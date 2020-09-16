import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Campaigns from "../pages/Campaigns";
import AddCampaigns from "../pages/AddCampaigns";
import EditCampaigns from "../pages/EditCampaigns";
import DetailCampaigns from "../pages/DetailCampaigns";

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/campaigns" component={Campaigns} />
        <Route exact path="/campaigns/add" component={AddCampaigns} />
        <Route path="/campaigns/detail/:id" component={DetailCampaigns} />
        <Route path="/campaigns/edit/:id" component={EditCampaigns} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </main>
  );
};

export default Main;
