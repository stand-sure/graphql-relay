import express from "express";
import { graphqlHTTP } from "express-graphql";

import schema from "./schema";

const port = 8080;

const app = express();

app.get("/", (req, resp) => {
    console.log(req?.headers);
    resp.send("GraphQL & Relay modern is cool");
});

const rootValue = {
    hello: () => {
        return "hello";
    },
};

app.use("/graphql", graphqlHTTP({ schema, rootValue, graphiql: true }));

app.listen(port, () => console.log(`Running server on localhost:${port}`));
