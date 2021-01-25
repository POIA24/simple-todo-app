import "./TodoListFilters.css";
import { useRecoilState } from "recoil";
import { todoListFilterState } from "../atoms"; //you must import your variables for calling
import { IconButton } from "@material-ui/core";

import AssignmentLateRoundedIcon from "@material-ui/icons/AssignmentLateRounded";
import AssignmentTurnedInRoundedIcon from "@material-ui/icons/AssignmentTurnedInRounded";
import AssignmentRoundedIcon from "@material-ui/icons/AssignmentRounded";

const TodoListFilters = () => {
	const [filter, setFilter] = useRecoilState(todoListFilterState);

	// { target: { value } } ➡➡ e.target.value
	const updateFilter = ({ target: { value } }) => {
		setFilter(value); // update the filter
	};

	return (
		<div className="todoListFilters">
			<IconButton value="Show All" onClick={updateFilter}>
				<AssignmentRoundedIcon />
			</IconButton>
			<IconButton value="Show Uncompleted" onClick={updateFilter}>
				<AssignmentLateRoundedIcon />
			</IconButton>
			<IconButton value="Show Completed" onClick={updateFilter}>
				<AssignmentTurnedInRoundedIcon />
			</IconButton>
		</div>
	);
};

export default TodoListFilters;
