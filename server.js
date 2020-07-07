import express from "express";
import { graphqlHTTP } from "express-graphql";
import path from "path";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

import { schema } from "./data/schema";
import { friendResolver } from "./resolvers";

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

const graphqlServer = express();

// const rootValue = {
//     ...friendResolver,
// };

graphqlServer.use("/", graphqlHTTP({ schema, graphiql: true, pretty: true }));

graphqlServer.listen(GRAPHQL_PORT, () =>
    console.log(`Running GraphQL server on localhost:${GRAPHQL_PORT}`)
);

const compiler = webpack({
    entry: ["whatwg-fetch", path.resolve(__dirname, "src", "App.js")],
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                ],
            },
        ],
    },
    output: {
        filename: "App.js",
        path: "/",
    },
    mode: "development"
});

const app = new WebpackDevServer(compiler, {
    contentBase: "/public/",
    proxy: {
        "/graphql": `http://localhost:${GRAPHQL_PORT}`,
    },
    publicPath: "/src",
    stats: {
        colors: true,
    },
    before(expressApp) {
        expressApp.use("/", express.static(path.resolve(__dirname, "public")));
    },
});

app.listen(APP_PORT, () =>
    console.log(`Running App server on localhost:${APP_PORT}`)
);
