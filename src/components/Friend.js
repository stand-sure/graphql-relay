import React from "react";
import { createFragmentContainer, graphql } from "react-relay";

const Friend = ({ friend /*, viewer */ }) => (
    <li className="col l6 s12">
        <div className="card">
            <div className="card-image">
                <img src={friend.image} alt={friend.firstName} />
                <span className="card-title">
                    {friend.firstName} {friend.lastName}
                </span>
            </div>
            <div className="card-content">
                <div className="row">
                    <div className="col l6 center">
                        <blockquote>Is a {friend.gender}</blockquote>
                    </div>
                    <div className="col l6 center">
                        <blockquote>Speaks {friend.language}</blockquote>
                    </div>
                </div>
            </div>
            <div className="card-action">
                <a href={"mailto:" + friend.email} target="_blank">
                    Email: {friend.email}
                </a>
            </div>
        </div>
    </li>
);

const container = createFragmentContainer(Friend, {
    friend: graphql`
        fragment Friend_friend on Friend {
            id
            firstName
            lastName
            gender
            language
            email
            image
        }
    `,
    // viewer: graphql`
    //     fragment Friend_viewer on User {
    //         id
    //     }
    // `,
});

export { container as Friend };
