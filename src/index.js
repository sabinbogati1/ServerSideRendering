import "babel-polyfill";
import express from "express";
import { matchRoutes } from "react-router-config";
import proxy from "express-http-proxy";
import Routes from "./client/Routes";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";


const app = express();

app.use("/api", proxy("http://react-ssr-api.herokuapp.com", {
    proxyReqOptDecorator(opts) {
        opts.header["x-forwarded-host"] = "localhost:3000";
        return opts;
    }
})
);

 app.use(express.static('public'));

app.get("*", (req, res) => {

    const store = createStore();

    //Some Logic to initialize
    //and Load data into the Store

    console.log("match Routes :: ", matchRoutes(Routes, req.path));

    const promises=  matchRoutes(Routes, req.path).map(({ route }) => {
        return route.loadData ? route.loadData(store) : null;
    });

    Promise.all(promises).then(() => {
        res.send(renderer(req, store));
    })

    res.send(renderer(req, store));
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
})