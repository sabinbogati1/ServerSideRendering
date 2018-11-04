import React from "react";

const Home = () => {
    return (
        <div>
            <div> I am the Home Component changed ---- ...</div>
            <button onClick={() => console.log("Hi there!!")}>BUTTON</button>
        </div>
    )
}


export default {
    component: Home
};