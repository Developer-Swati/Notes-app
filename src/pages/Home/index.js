import React from "react";
import Navbar from '../../components/Navbar';
import SideBar from "../../components/SideBar";
import InputForm from "../../components/InputForm";
import { Fragment } from "react";

const Home = () => {
    return(
        <Fragment>
        <Navbar />
        <main className="flex gap-5">
            <SideBar />
            <div >
            <InputForm />
            </div>
        </main>
        </Fragment>
    )
}

export default Home;