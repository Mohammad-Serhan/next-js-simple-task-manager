import { initialTasks } from "./data/mockData";
import { TaskTable } from "./components/TaskTable";

export default function Page() {
	return (
		<main className="p-6">
			<h1 className="text-3xl font-bold mb-4">My Task Manager</h1>
			<TaskTable initialData={initialTasks} />
		</main>
	);
}
