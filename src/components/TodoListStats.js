import "./TodoListStats.css";
import { useRecoilValue } from "recoil";
import { todoListStatsState } from "../atoms"; //you must import your variables for calling
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const TodoListStats = () => {
	const {
		// totalNum,
		// totalCompletedNum,
		// totalUncompletedNum,
		percentCompleted,
	} = useRecoilValue(todoListStatsState);

	const formattedPercentCompleted = Math.round(percentCompleted);

	return (
		<div className="todoListStats">
			<CircularProgressbarWithChildren
				value={formattedPercentCompleted}
				text={`${formattedPercentCompleted}%`}
			/>
		</div>
	);
};

export default TodoListStats;
