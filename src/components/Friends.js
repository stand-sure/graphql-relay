import React from "react";

import { FriendsList } from "./FriendsList";
import { createFragmentContainer, graphql } from "react-relay";

const Friends = ({ viewer }) => {
    return (
        <div>
            <div className="navbar-fixed">
                <nav className="grey darken-4">
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo center">
                            Friends
                        </a>
                    </div>
                </nav>
            </div>
            <div>
                <FriendsList viewer={viewer} />
            </div>
        </div>
    );
};

const container = createFragmentContainer(Friends, {
    viewer: graphql`
        fragment Friends_viewer on User {
            id
            ...FriendsList_viewer
        }
    `,
});

// export default container;
export { container as Friends };
