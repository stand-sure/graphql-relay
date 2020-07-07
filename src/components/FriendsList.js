import React from "react";

import { Friend } from "./Friend";
import { createFragmentContainer, graphql } from "react-relay";

const FriendsList = ({ viewer }) => {
    const renderFriends = function renderFriends() {
        return viewer.friends.edges.map((edge) => (
            <Friend key={edge.node.id} friend={edge.node} viewer={viewer} />
        ));
    };

    return (
        <div>
            <div className="row">
                <ul>{renderFriends()}</ul>
            </div>
        </div>
    );
};

const container = createFragmentContainer(FriendsList, {
    viewer: graphql`
        fragment FriendsList_viewer on User {
            friends {
                edges {
                    node {
                        id
                        ...Friend_friend
                    }
                }
            }
            id
            ...Friend_viewer
        }
    `,
});

export { container as FriendsList };
