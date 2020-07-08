import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    fromGlobalId,
    nodeDefinitions,
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
        const { type, id } = fromGlobalId(globalId);
        if (type === "Friend") {
            return getFriend(id);
        } else if (type === "User") {
            return getUser(id);
        }

        return null;
    },
    (obj) => {
        if (obj[Symbol.for("factory")] === createFriend) {
            return GraphQLFriend;
        } else if (obj[Symbol.for("factory")] === createUser) {
            return GraphQLUser;
        }

        return null;
    }
);

const GraphQLFriend = new GraphQLObjectType({
    name: "Friend",
    // @ts-ignore
    fields: () => ({
        id: globalIdField("Friend"),
        firstName: {
            type: GraphQLString,
            description: "First name",
        },
        lastName: {
            type: GraphQLString,
            description: "Last name",
        },
        gender: {
            type: GraphQLString,
            description: "Gender",
        },
        language: {
            type: GraphQLString,
            description: "Language (spoken)",
        },
        email: {
            type: GraphQLString,
            description: "Email address",
        },
        image: {
            type: GraphQLString,
            description: "Image URL [not validated]",
        },
    }),
    interface: [nodeInterface],
});

const { connectionType: friendsConnection } = connectionDefinitions({
    name: "Friend",
    nodeType: GraphQLFriend,
});

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
