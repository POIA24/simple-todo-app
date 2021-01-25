import "./App.css";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "./atoms"; //you must import your atoms for calling
import axios from "axios";

//components
import TodoCreator from "./components/TodoCreator";
import TodoItem from "./components/TodoItem";
import TodoListFilters from "./components/TodoListFilters";

function App() {
	const [quote, setQuote] = useState({ text: "Loading..." });
	const [todoList, setTodoList] = useRecoilState(todoListState); //get the value from the recoil state, userecoilState can read/write variables

	useEffect(() => {
		const max = 1643; //max index of the array who come back from the api
		const randomNumber = Math.floor(Math.random() * (max - 0) + 0);

		//fetching the quote from the api
		(async () => {
			try {
				const response = await axios.get("https://type.fit/api/quotes");
				setQuote(response.data[randomNumber]);
			} catch (error) {
				console.log(error);
			}
		})();

		//check if the local storage as got something inside, if yes, set the todoList state with those value
		const localTodos = JSON.parse(localStorage.getItem("todoListStorage"));
		if (localTodos) setTodoList([...localTodos]);
	}, []);

	return (
		<div className="app">
			<h1 className="app__quote">
				{quote.text}
				<br />
				<span className="app__quote-sub">{quote.author}</span>
			</h1>

			<TodoListFilters />
			<TodoCreator />

			<div className="app__todoList">
				{todoList.map((todoItem) => (
					<TodoItem key={todoItem.id} item={todoItem} />
				))}
			</div>
		</div>
	);
}

export default App;
