import "./TodoCreator.css";
import { useRecoilState } from "recoil";
import { todoListState } from "../atoms"; //you must import your atoms for calling
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import { IconButton } from "@material-ui/core";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";

const TodoCreator = () => {
	const [inputValue, setInputValue] = useState("");
	const [todoList, setTodoList] = useRecoilState(todoListState); //get the value from the recoil state, userecoilState can read/write variables

	// setTodoList function is an hook to get a setter function is inside todoList
	// if you don't need the complete todoList you can call it in this way ⬇⬇⬇
	// const setTodoList = useSetRecoilState(todoListState);

	const addItem = (e) => {
		e.preventDefault();
		if (!inputValue) return;

		setTodoList([
			{
				id: uuid(), // generete random id with the library uuid
				text: capitalizeTodo(inputValue),
				isComplete: false,
				createdOn: new Date().toString(),
			},
			...todoList,
		]);
		setInputValue("");
	};

	const capitalizeTodo = (string) => {
		if (typeof string !== "string") return "";
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	useEffect(() => {
		//save in local storage every time todos change except when the todos are 0
		if (todoList.length > 0)
			localStorage.setItem("todoListStorage", JSON.stringify(todoList));
	}, [todoList]);

	return (
		<div className="todoCreator">
			<form onSubmit={addItem}>
				<input
					type="text"
					value={inputValue}
					onChange={({ target: { value } }) => setInputValue(value)} //set the recoil variable at the same way of useState hook
				/>
				<IconButton type="submit">
					<AddCircleRoundedIcon />
				</IconButton>
			</form>
		</div>
	);
};

export default TodoCreator;
