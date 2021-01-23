import "./Input.css";
import { useRecoilState } from "recoil";
import { inputText, Todos } from "./atoms"; //you must import your variables for calling

const Input = () => {
	const [input, setInput] = useRecoilState(inputText); //get the value from the recoil state, userecoilState can read/write variables
	const [todos, setTodos] = useRecoilState(Todos); //get the value from the recoil state, userecoilState can read/write variables

	const addTodo = (e) => {
		e.preventDefault();
		setTodos([...todos, input]); //set the recoil variable at the same way of useState hook
		setInput("");
	};

	return (
		<div className="input">
			<form>
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)} //set the recoil variable at the same way of useState hook
				/>
				<button type="submit" onClick={addTodo}>
					Add
				</button>
			</form>
			{todos.map((todo) => (
				<h1>{todo}</h1>
			))}
		</div>
	);
};

export default Input;
