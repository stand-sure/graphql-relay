import { nanoid } from "nanoid";
import data from "./data.json";

/** @interface */
const User = class {
    constructor() {
        throw new Error("interface only");
    }

    /** @type {string|undefined} */
    id;

    /** @type {string|undefined} */
    name;
};

/**
 * @param {object} obj
 * @param {string} obj.id
 * @param {string} obj.name
 * @returns {User}
 */
const createUser = function createUser({ id, name }) {
    const newUser = Object.freeze(
        Object.assign(Object.create(null), {
            id: id ?? nanoid(),
            name,
            [Symbol.for("factory")]: createUser,
        })
    );

    return newUser;
};

/** @interface */
const Friend = class {
    constructor() {
        throw new Error("interface only");
    }

    /** @type {string} */
    id;

    /** @type {string|undefined} */
    firstName;

    /** @type {string|undefined} */
    lastName;

    /** @type {string|undefined} */
    gender;

    /** @type {string|undefined} */
    email;

    /** @type {string|undefined} */
    image;
};

/**
 * @param {object} obj
 * @property {string} obj.firstName
 * @property {string} obj.lastName
 * @property {string} obj.gender
 * @property {string} obj.email
 * @property {string} obj.image
 * @returns {Friend}
 */
const createFriend = function createFriend({
    firstName,
    lastName,
    gender,
    email,
    image,
}) {
    const newFriend = Object.freeze(
        Object.assign(Object.create(null), {
            id: nanoid(),
            firstName,
            lastName,
            gender,
            email,
            image,
            [Symbol.for("factory")]: createFriend,
        })
    );

    return newFriend;
};

const viewer = createUser({ id: "1", name: "me" });

const friends = data.map((el) => createFriend(el));

/**
 * @param {string} id
 * @returns {User|undefined}
 */
const getUser = (id) => (id === viewer.id ? viewer : undefined);

/**
 * @returns {User}
 */
const getViewer = () => viewer;

/**
 * @param {string} id
 * @returns {Friend|undefined}
 */
const getFriend = (id) => friends.find((f) => f.id === id);

/**
 * @returns {Array<Friend>}
 */
const getFriends = () => friends;

export { createFriend, createUser, getFriend, getFriends, getUser, getViewer };
