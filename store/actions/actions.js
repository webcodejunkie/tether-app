import { SET_USER } from "../types";

export function setUser(value) {
  return {
    type: SET_USER,
    value
  };
}