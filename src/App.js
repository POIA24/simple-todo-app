import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Input from "./Input";
import Todo from "./Todo";
import { useRecoilState } from "recoil";
import { Todos } from "./atoms"; //you must import your variables for calling

function App() {
	const [quote, setQuote] = useState("");
	const [todos, setTodos] = useRecoilState(Todos); //get the value from the recoil state, userecoilState can read/write variables

	useEffect(() => {
		const max = 1643; //max index of the array who come from the api
		const randomNumber = Math.floor(Math.random() * (max - 0) + 0);
		(async () => {
			try {
				const response = await axios.get("https://type.fit/api/quotes");
				setQuote(response.data[randomNumber]);
			} catch (error) {
				console.log(error);
			}
		})();
		const localTodos = JSON.parse(localStorage.getItem("todos"));
		if (localTodos) setTodos([...localTodos]);
	}, []);

	return (
		<div className="app">
			<h1>{quote.text}</h1>
			<Input />
			<div className="app__todoList">
				{todos.map((todo) => (
					<Todo text={todo} />
				))}
			</div>
		</div>
	);
}

export default App;
