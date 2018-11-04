import express from "express";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";


 const app = express();

 app.use(express.static('public'));

app.get("*", (req, res) => {

    const store = createStore();

    //Some Logic to initialize
    //and Load data into the Store

    res.send(renderer(req, store));
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
})