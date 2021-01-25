import "./TodoItem.css";
import { useRecoilState } from "recoil";
import { todoListState } from "../atoms"; //you must import your variables for calling

const TodoItem = ({ item }) => {
	const [todoList, setTodoList] = useRecoilState(todoListState);
	const index = todoList.findIndex((listItem) => listItem === item);

	//{ target: { value } } ➡ decontructuring of the event, that means e.target.value
	const editItemText = ({ target: { value } }) => {
		const newList = replaceItemAtIndex(todoList, index, {
			...item,
			text: value,
		});

		setTodoList(newList);
	};

	const toggleItemCompletion = () => {
		const newList = replaceItemAtIndex(todoList, index, {
			...item,
			isComplete: !item.isComplete,
		});

		setTodoList(newList);
	};

	const deleteItem = () => {
		const newList = removeItemAtIndex(todoList, index);

		setTodoList(newList);

		//if the todoList is empty set the local storage to empty
		if (newList.length == 0) {
			localStorage.setItem("todoListStorage", JSON.stringify(newList));
		}
	};

	const replaceItemAtIndex = (arr, index, newValue) => {
		// return new array in this way ⬇
		//
		// 1) ...arr.slice(0, index) means ➡ extract all the value inside the array from value 0 to index
		// (index is the value of the element you are tring to modify)
		//
		// 2) add the newValue to the array
		//
		// 3) ...arr.slice(index + 1) means ➡ extract all the value inside the array from index + 1 till the end
		return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
	};

	const removeItemAtIndex = (arr, index) => {
		// same explaination of replaceItemAtIndex() without the insert of the new value
		// basically return a new array skipping the index we want to delete
		return [...arr.slice(0, index), ...arr.slice(index + 1)];
	};

	return (
		<div className="todoItem">
			<input type="text" value={item.text} onChange={editItemText} />
			<input
				type="checkbox"
				checked={item.isComplete}
				onChange={toggleItemCompletion}
			/>
			<button onClick={deleteItem}>X</button>
		</div>
	);
};

export default TodoItem;
