import { nanoid } from "nanoid";

/**
 * @enum {string}
 */
const Gender = {
    MALE: "MALE",
    FEMALE: "FEMALE",
    OTHER: "OTHER",
};

/**
 * @typedef Friend
 * @property {string|number|undefined} [id]
 * @property {string} firstName
 * @property {string} lastName
 * @property {Gender} gender
 * @property {string} email
 */

/**
 * @param {Friend} obj
 * @returns {Friend}
 */
const makeFriend = function makeFriend({ lastName, firstName, gender, email }) {
    const id = nanoid();
    console.info(`Created friend ${firstName} ${lastName}: ${id}`);
    return Object.freeze(
        Object.assign(Object.create(null), {
            id,
            firstName,
            lastName,
            gender,
            email,
        })
    );
};

const friends = new Map();
const firstFriend = makeFriend({
    firstName: "Adam",
    lastName: "Smith",
    gender: "MALE",
    email: "adam.smith@example.com",
});
friends.set(firstFriend.id, firstFriend);

const getFriend = ({ id }) => ({ ...friends.get(id) });

const getFriends = () => [...friends.values()];

const createFriend = function ({ input }) {
    const newFriend = makeFriend({ ...input });
    friends.set(newFriend.id, newFriend);
    return newFriend;
};

const updateFriend = function ({ id, input }) {
    const foundFriend = friends.get(id);

    if (!foundFriend) {
        return;
    }

    const updatedFriend = { ...foundFriend, ...input, id };
    friends.set(id, updatedFriend);
    return updatedFriend;
};

const friendResolver = {
    getFriend,
    getFriends,
    createFriend,
    updateFriend,
};

export { friendResolver };
