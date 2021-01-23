import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Input from "./Input";

function App() {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState("");
	const [quote, setQuote] = useState("");

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
	}, []);

	return (
		<div className="App">
			<h1>{quote.text}</h1>
			<Input />
		</div>
	);
}

export default App;
