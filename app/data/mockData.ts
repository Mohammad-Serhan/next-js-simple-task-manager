export type Task = {
	id: number;
	title: string;
	status: "Pending" | "Completed";
};

export const initialTasks: Task[] = [
	{ id: 1, title: "Fix Tailwind setup", status: "Completed" },
	{ id: 2, title: "Implement TanStack Table", status: "Pending" },
	{ id: 3, title: "Deploy to Vercel", status: "Pending" },
];
