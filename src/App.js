import "./App.css";
import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { todoListState, filteredTodoListState } from "./atoms"; //you must import your atoms for calling
import axios from "axios";
import FlipMove from "react-flip-move";

//components
import TodoCreator from "./components/TodoCreator";
import TodoItem from "./components/TodoItem";
import TodoListFilters from "./components/TodoListFilters";
import TodoListStats from "./components/TodoListStats";

import { IconButton } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

function App() {
	const [quote, setQuote] = useState({ text: "Loading..." });
	const todoListSorted = useRecoilValue(filteredTodoListState); //get the value from the recoil state, useRecoilValue can only read variables that's why the todoList below is imported
	const setTodoList = useSetRecoilState(todoListState); // get the value from the recoil state, useSetRecoilState can only set variables

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

		//check if the local storage has got something inside, if yes, set the todoList state with those value
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

			<TodoListStats />
			<TodoListFilters />
			<TodoCreator />

			<div className="app__todoList">
				<FlipMove>
					{todoListSorted.map((todoItem) => (
						<TodoItem key={todoItem.id} item={todoItem} />
					))}
				</FlipMove>
			</div>

			<div className="app__aboutMe">
				<IconButton target="blank" href="https://github.com/deSimons">
					<GitHubIcon />
				</IconButton>
				<IconButton target="blank" href="https://www.instagram.com/de_simons/">
					<InstagramIcon />
				</IconButton>
				<IconButton
					target="blank"
					href="https://www.linkedin.com/in/luca-de-simoni/"
				>
					<LinkedInIcon />
				</IconButton>
			</div>
		</div>
	);
}

export default App;
