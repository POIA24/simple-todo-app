import { atom } from "recoil";

export const inputText = atom({
	key: "inputText", // unique ID
	default: "", // initial value
});

export const Todos = atom({
	key: "Todos", // unique ID
	default: [], // initial value
});
