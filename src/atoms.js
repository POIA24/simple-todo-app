import { selector } from "recoil";
import { atom } from "recoil";

export const todoListState = atom({
	key: "todoListState ", // unique ID
	default: [], // initial value as an empty array
});

export const todoListFilterState = atom({
	key: "todoListFilterState",
	default: "Show All",
});

export const filteredTodoListState = selector({
	key: "filteredTodoListState",
	get: ({ get }) => {
		// grab the filter criteria and the todo list
		const filter = get(todoListFilterState);
		const list = get(todoListState);

		//switch case for the filter we need, in this case is the filter criteria whose value is saved in todoListFilterState atom
		switch (filter) {
			case "Show Completed":
				return list.filter((item) => item.isComplete);
			case "Show Uncompleted":
				return list.filter((item) => !item.isComplete);
			default:
				return list;
		}
	},
});

export const todoListStatsState = selector({
	key: "todoListStatsState",
	get: ({ get }) => {
		// grab the information about todo list
		const todoList = get(todoListState);
		const totalNum = todoList.length; // how many todos
		const totalCompletedNum = todoList.filter((item) => item.isComplete).length; // how many completed todos
		const totalUncompletedNum = totalNum - totalCompletedNum; // how many uncompleted todos
		const percentCompleted =
			totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100; // percent completed

		// return an object with those value
		return {
			totalNum,
			totalCompletedNum,
			totalUncompletedNum,
			percentCompleted,
		};
	},
});
