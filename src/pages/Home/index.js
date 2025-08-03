import React from "react";
import Navbar from "../../components/Navbar";
import SideBar from "../../components/SideBar";
import InputForm from "../../components/InputForm";
import { Fragment } from "react";

const Home = () => {
  return (
    <Fragment>
      <Navbar />
      <main className="flex min-h-screen">
        <SideBar />
        <div className="flex-1 main-content overflow-y-auto">
          <InputForm />
        </div>
      </main>
    </Fragment>
  );
};

export default Home;