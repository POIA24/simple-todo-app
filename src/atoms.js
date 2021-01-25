import { atom } from "recoil";

export const todoListState = atom({
	key: "todoListState ", // unique ID
	default: [], // initial value as an empty array
});
