import express from "express";

const port = 8080;

const app = express();

app.get("/", (req, resp) => {
    resp.send("GraphQL & Relay modern is cool");
});

app.listen(port, () => console.log(`Running server on localhost:${port}`));
