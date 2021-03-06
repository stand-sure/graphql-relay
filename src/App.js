import React from "react";
import ReactDOM from "react-dom";
import { QueryRenderer, graphql } from "react-relay";
import { Environment, Network, RecordSource, Store } from "relay-runtime";

import { Friends } from "./components/Friends";

// Network layer
function fetchQuery(operation, variables) {
    return fetch("/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
    }).then((response) => {
        return response.json();
    });
}

// Relay environment
const modernEnvironment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
});

const mountNode = document.getElementById("root");

const query = graphql`
            query AppQuery {
                viewer {
                    ...Friends_viewer
                }
            }
        `;

const variables = {};

const render = ({ error, props }) => {
    if (props) {
        // @ts-ignore
        return <Friends viewer={props.viewer} />;
    }
    else {
        return <div>Loading...</div>;
    }
};

ReactDOM.render(
    <QueryRenderer
        environment={modernEnvironment}
        query={query}
        variables={variables}
        render={render}
    />,
    mountNode
);
