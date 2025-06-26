import { initialTasks } from "./data/mockData";
import { TaskTable } from "./components/DataTable";

export default function Page() {
	return (
		<main className="p-8">
			<h1 className="text-2xl font-bold mb-6">My Task Manager</h1>
			<TaskTable initialData={initialTasks} />
		</main>
	);
}
