import {createContext} from "react";

const noop = () => {};

export const ProfileContext = createContext({
  profile: null,
  signIn: noop,
  signOut: noop,
  subscribe: noop,
  updatePosts: noop,
});