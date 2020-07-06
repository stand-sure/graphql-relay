import { makeExecutableSchema } from "graphql-tools";
import gql from "graphql-tag";

const typeDefs = gql`
    """
    Queries:
    """
    type Query {
        """
        Gets a Friend.
        """
        friend: Friend
    }

    """
    Gender enum.
    """
    enum Gender {
        MALE
        FEMALE
        OTHER
    }

    """
    Friend object.
    """
    type Friend {
        """
        The auto-generated ID.
        """
        id: ID
        """
        The first name.
        """
        firstName: String
        """
        The last name.
        """
        lastName: String
        """
        The gender.
        """
        gender: Gender
        """
        The email address.
        """
        email: String
    }
`;

const schema = makeExecutableSchema({ typeDefs });

export { schema };
