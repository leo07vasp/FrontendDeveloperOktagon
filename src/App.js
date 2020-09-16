import React from "react";
import "./assets/scss/App.scss";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <main
            role="main"
            className="col-md-9 ml-sm-auto col-lg-10 px-md-5 pt-3 "
          >
            <Main />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
