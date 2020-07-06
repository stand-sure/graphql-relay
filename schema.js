import { makeExecutableSchema } from "graphql-tools";
import gql from "graphql-tag";

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const schema = makeExecutableSchema({ typeDefs });

export default schema;
