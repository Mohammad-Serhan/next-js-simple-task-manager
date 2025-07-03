import { TaskTable } from "./components/TaskTable";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

export default async function Page() {
	const res = await fetch(`${baseUrl}/api/tasks`, {
		cache: "no-store",
	});
	const tasks = await res.json();

	return (
		<main className="p-6">
			<h1 className="text-3xl font-bold mb-4">My Task Manager</h1>
			<TaskTable initialData={tasks} />
		</main>
	);
}
