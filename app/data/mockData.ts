export type Task = {
	id: number;
	title: string;
	description: string;
	status: "Pending" | "Completed";
	priority: "Low" | "Medium" | "High";
};

export const initialTasks: Task[] = [
	{
		id: 1,
		title: "Set up Tailwind",
		description: "Install and configure Tailwind in Next.js",
		status: "Completed",
		priority: "Low",
	},
	{
		id: 2,
		title: "Add Task Table",
		description: "Display tasks using TanStack Table",
		status: "Pending",
		priority: "Medium",
	},
	{
		id: 3,
		title: "Improve UI with ShadCN",
		description: "Use ShadCN badge for status and priority",
		status: "Pending",
		priority: "High",
	},
];
