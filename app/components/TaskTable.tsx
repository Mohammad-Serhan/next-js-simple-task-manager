"use client";

import React, { useState } from "react";
import {
	useReactTable,
	getCoreRowModel,
	flexRender,
	ColumnDef,
} from "@tanstack/react-table";
import { Task } from "../data/mockData";
import { Badge } from "@/components/ui/badge";

type Props = {
	initialData: Task[];
};

export function TaskTable({ initialData }: Props) {
	const [data, setData] = useState<Task[]>(initialData);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [editRow, setEditRow] = useState<Partial<Task>>({});
	const [newTask, setNewTask] = useState<Task>({
		id: Date.now(),
		title: "",
		description: "",
		status: "Pending",
		priority: "Low",
	});

	const handleAdd = () => {
		if (!newTask.title.trim()) return;
		setData((prev) => [...prev, { ...newTask, id: Date.now() }]);
		setNewTask({
			id: Date.now(),
			title: "",
			description: "",
			status: "Pending",
			priority: "Low",
		});
	};

	const handleEdit = (task: Task) => {
		setEditingId(task.id);
		setEditRow({ ...task });
	};

	const handleSave = (id: number) => {
		setData((prev) =>
			prev.map((task) =>
				task.id === id ? { ...task, ...(editRow as Task) } : task
			)
		);
		setEditingId(null);
		setEditRow({});
	};

	const handleDelete = (id: number) => {
		setData((prev) => prev.filter((task) => task.id !== id));
	};

	const columns: ColumnDef<Task>[] = [
		{
			accessorKey: "title",
			header: "Title",
			cell: ({ row }) => {
				const task = row.original;
				return editingId === task.id ? (
					<input
						value={editRow.title || ""}
						onChange={(e) =>
							setEditRow({ ...editRow, title: e.target.value })
						}
						className="border px-2 py-1 w-full"
					/>
				) : (
					task.title
				);
			},
		},
		{
			accessorKey: "description",
			header: "Description",
			cell: ({ row }) => {
				const task = row.original;
				return editingId === task.id ? (
					<input
						value={editRow.description || ""}
						onChange={(e) =>
							setEditRow({
								...editRow,
								description: e.target.value,
							})
						}
						className="border px-2 py-1 w-full"
					/>
				) : (
					task.description
				);
			},
		},
		{
			accessorKey: "status",
			header: "Status",
			cell: ({ row }) => {
				const task = row.original;
				return editingId === task.id ? (
					<select
						value={editRow.status}
						onChange={(e) =>
							setEditRow({
								...editRow,
								status: e.target.value as Task["status"],
							})
						}
						className="border p-1 w-full"
					>
						<option value="Pending">Pending</option>
						<option value="Completed">Completed</option>
					</select>
				) : (
					<Badge
						variant={
							task.status === "Completed" ? "default" : "outline"
						}
					>
						{task.status}
					</Badge>
				);
			},
		},
		{
			accessorKey: "priority",
			header: "Priority",
			cell: ({ row }) => {
				const task = row.original;
				return editingId === task.id ? (
					<select
						value={editRow.priority}
						onChange={(e) =>
							setEditRow({
								...editRow,
								priority: e.target.value as Task["priority"],
							})
						}
						className="border p-1 w-full"
					>
						<option value="Low">Low</option>
						<option value="Medium">Medium</option>
						<option value="High">High</option>
					</select>
				) : (
					<Badge
						className={
							task.priority === "High"
								? "bg-red-500 text-white"
								: task.priority === "Medium"
								? "bg-yellow-400 text-black"
								: "bg-green-500 text-white"
						}
					>
						{task.priority}
					</Badge>
				);
			},
		},
		{
			header: "Actions",
			cell: ({ row }) => {
				const task = row.original;
				return editingId === task.id ? (
					<button
						onClick={() => handleSave(task.id)}
						className="text-green-600 text-sm font-medium"
					>
						Save
					</button>
				) : (
					<div className="space-x-2">
						<button
							onClick={() => handleEdit(task)}
							className="text-blue-600 text-sm font-medium"
						>
							Edit
						</button>
						<button
							onClick={() => handleDelete(task.id)}
							className="text-red-600 text-sm font-medium"
						>
							Delete
						</button>
					</div>
				);
			},
		},
	];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="space-y-8">
			{/* Add Task Form */}
			<div className="space-y-4">
				<h2 className="text-xl font-semibold">Add New Task</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<input
						type="text"
						value={newTask.title}
						placeholder="Title"
						onChange={(e) =>
							setNewTask({ ...newTask, title: e.target.value })
						}
						className="border px-3 py-2 rounded"
					/>
					<input
						type="text"
						value={newTask.description}
						placeholder="Description"
						onChange={(e) =>
							setNewTask({
								...newTask,
								description: e.target.value,
							})
						}
						className="border px-3 py-2 rounded"
					/>
					<select
						value={newTask.status}
						onChange={(e) =>
							setNewTask({
								...newTask,
								status: e.target.value as Task["status"],
							})
						}
						className="border px-3 py-2 rounded"
					>
						<option value="Pending">Pending</option>
						<option value="Completed">Completed</option>
					</select>
					<select
						value={newTask.priority}
						onChange={(e) =>
							setNewTask({
								...newTask,
								priority: e.target.value as Task["priority"],
							})
						}
						className="border px-3 py-2 rounded"
					>
						<option value="Low">Low</option>
						<option value="Medium">Medium</option>
						<option value="High">High</option>
					</select>
				</div>
				<button
					onClick={handleAdd}
					className="bg-blue-600 text-white px-4 py-2 rounded"
				>
					Add Task
				</button>
			</div>

			{/* Table */}
			<div className="border rounded-md overflow-x-auto">
				<table className="w-full table-auto">
					<thead className="bg-gray-100">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="px-4 py-2 border-b text-left text-sm font-semibold"
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.header,
													header.getContext()
											  )}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} className="hover:bg-gray-50">
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										className="px-4 py-2 border-b text-sm"
									>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
