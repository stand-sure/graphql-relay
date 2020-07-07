import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    fromGlobalId,
    nodeDefinitions,
    toGlobalId,
    globalIdField,
} from "graphql-relay";

import {
    createFriend,
    createUser,
    getFriend,
    getFriends,
    getUser,
    getViewer,
} from "./database";

const { nodeInterface, nodeField } = nodeDefinitions(
    (globalId) => {
        debugger;
        const { type, id } = fromGlobalId(globalId);
        if (type === "Friend") {
            return getFriend(id);
        } else if (type === "User") {
            return getUser(id);
        }

        return null;
    },
    (obj) => {
        debugger;
        if (obj[Symbol.for("factory")] === createFriend) {
            return GraphQLFriend;
        } else if (obj[Symbol.for("factory")] === createUser) {
            return GraphQLUser;
        }

        return null;
    }
);

const GraphQLUser = new GraphQLObjectType({
    name: "User",
    // @ts-ignore
    fields: () => ({
        id: globalIdField("User"),
        friends: {
            type: friendsConnection,
            args: connectionArgs,
            resolve: (_, args) => connectionFromArray(getFriends(), args),
        },
    }),
    interface: [nodeInterface],
});
16;

const GraphQLFriend = new GraphQLObjectType({
    name: "Friend",
    // @ts-ignore
    fields: () => ({
        id: globalIdField("Friend"),
        firstName: {
            type: GraphQLString,
        },
        lastName: {
            type: GraphQLString,
        },
        gender: {
            type: GraphQLString,
        },
        language: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
        image: {
            type: GraphQLString,
        },
    }),
    interface: [nodeInterface],
});

const { connectionType: friendsConnection } = connectionDefinitions({
    name: "Friend",
    nodeType: GraphQLFriend,
});

const Query = new GraphQLObjectType({
    name: "Query",
    // @ts-ignore
    fields: () => ({
        node: nodeField,
        viewer: {
            type: GraphQLUser,
            resolve: () => getViewer(),
        },
    }),
});

export const schema = new GraphQLSchema({
    query: Query,
});
