import "./TodoItem.css";
import { forwardRef } from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "../atoms"; //you must import your variables for calling

import { IconButton } from "@material-ui/core";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import Checkbox from "@material-ui/core/Checkbox";

const TodoItem = forwardRef((props, ref) => {
	const { item } = props;
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
		if (newList.length === 0) {
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
		<div ref={ref} className={`todoItem  ${item.isComplete}`}>
			<input type="text" value={item.text} onChange={editItemText} />
			<Checkbox
				size="small"
				checked={item.isComplete}
				onChange={toggleItemCompletion}
			/>
			<IconButton onClick={deleteItem}>
				<ClearRoundedIcon />
			</IconButton>
		</div>
	);
});

export default TodoItem;
