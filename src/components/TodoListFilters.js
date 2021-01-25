import "./TodoListFilters.css";
import { useRecoilState } from "recoil";
import { todoListFilterState } from "../atoms"; //you must import your variables for calling

const TodoListFilters = () => {
	const [filter, setFilter] = useRecoilState(todoListFilterState);

	const updateFilter = ({ target: { value } }) => {
		setFilter(value);
	};

	return (
		<div className="todoListFilters">
			Filter:
			<select value={filter} onChange={updateFilter}>
				<option value="Show All">All</option>
				<option value="Show Completed">Completed</option>
				<option value="Show Uncompleted">Uncompleted</option>
			</select>
		</div>
	);
};

export default TodoListFilters;
