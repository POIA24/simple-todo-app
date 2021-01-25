import "./TodoCreator.css";
import { useRecoilState } from "recoil";
import { todoListState } from "../atoms"; //you must import your atoms for calling
import { useEffect, useState } from "react";
import uuid from "react-uuid";

const TodoCreator = () => {
	const [inputValue, setInputValue] = useState("");
	const [todoList, setTodoList] = useRecoilState(todoListState); //get the value from the recoil state, userecoilState can read/write variables

	// setTodoList function is an hook to get a setter function is inside todoList
	// if you don't need the complete todoList you can call it in this way ⬇
	// const setTodoList = useSetRecoilState(todoListState);

	const addItem = (e) => {
		e.preventDefault();

		setTodoList([
			{
				id: uuid(), // genereta random id with the library uuid
				text: inputValue,
				isComplete: false,
			},
			...todoList,
		]);
		setInputValue("");
	};

	useEffect(() => {
		//save in local storage every time todos change except when the todos are 0
		if (todoList.length > 0)
			localStorage.setItem("todoListStorage", JSON.stringify(todoList));
	}, [todoList]);

	return (
		<div className="input">
			<form onSubmit={addItem}>
				<input
					type="text"
					value={inputValue}
					onChange={({ target: { value } }) => setInputValue(value)} //set the recoil variable at the same way of useState hook
				/>
				<button type="submit">Add</button>
			</form>
		</div>
	);
};

export default TodoCreator;
