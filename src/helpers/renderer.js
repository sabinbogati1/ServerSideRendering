import React from "react";
import {renderToString} from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import serialize from "serialize-javascript";
import { Provider } from "react-redux";
import { renderRoutes} from "react-router-config";
import Routes from "./../client/Routes";

export default (req,store) =>{
    const content = renderToString(
        <Provider store={store}>
             <StaticRouter location={req.path} context={{}}>
                    <div> {renderRoutes(Routes)}  </div>
            </StaticRouter>
        </Provider>

    );

   return `
    <html>
        <header> </header>
        <body>
            <div id="root"> ${content} </div>
            <script>
                window.INITIAL_STATE = ${serialize(store.getState())}
            </script>
            <script src="bundle.js"> </script>
        </body>
    </html>

`;

}

