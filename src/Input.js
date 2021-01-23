import "./Input.css";
import { useRecoilState } from "recoil";
import { inputText, Todos } from "./atoms"; //you must import your variables for calling
import { useEffect } from "react";

const Input = () => {
	const [input, setInput] = useRecoilState(inputText); //get the value from the recoil state, userecoilState can read/write variables
	const [todos, setTodos] = useRecoilState(Todos); //get the value from the recoil state, userecoilState can read/write variables

	const addTodo = (e) => {
		e.preventDefault();
		setTodos([input, ...todos]); //set the recoil variable at the same way of useState hook
		setInput("");
	};

	useEffect(() => {
		//save in local storage every time todos change
		if (todos.length > 0) localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	return (
		<div className="input">
			<form onSubmit={addTodo}>
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)} //set the recoil variable at the same way of useState hook
				/>
				<button type="submit">Add</button>
			</form>
		</div>
	);
};

export default Input;
