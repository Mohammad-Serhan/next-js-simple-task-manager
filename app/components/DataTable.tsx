"use client";

import React, { useState } from "react";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	HeaderGroup,
	Header,
	Row,
	Cell,
	CellContext
} from "@tanstack/react-table";
import { Task } from "../data/mockData";

type Props = {
	initialData: Task[];
};

export function TaskTable({ initialData }: Props) {
	const [data, setData] = useState<Task[]>(initialData);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [newTask, setNewTask] = useState({
		title: "",
		status: "Pending" as "Pending" | "Completed",
	});

	const handleAdd = () => {
		if (!newTask.title.trim()) return;
		const newItem: Task = {
			id: Date.now(),
			title: newTask.title,
			status: newTask.status,
		};
		setData((prev) => [...prev, newItem]);
		setNewTask({ title: "", status: "Pending" });
	};

	const handleDelete = (id: number) => {
		setData((prev) => prev.filter((task) => task.id !== id));
	};

	const handleEdit = (id: number) => {
		setEditingId(id);
	};

	const handleSave = (
		id: number,
		updatedTitle: string,
		updatedStatus: Task["status"]
	) => {
		setData((prev) =>
			prev.map((task) =>
				task.id === id
					? { ...task, title: updatedTitle, status: updatedStatus }
					: task
			)
		);
		setEditingId(null);
	};

	const columns: ColumnDef<Task>[] = [
		{
			header: "Title",
			cell: ({ row }: CellContext<Task, unknown>) => {
				const task = row.original;
				if (editingId === task.id) {
					return (
						<input
							className="border p-1 w-full"
							defaultValue={task.title}
							onChange={(e) => (task.title = e.target.value)}
						/>
					);
				}
				return task.title;
			},
		},
		{
			header: "Status",
			cell: ({ row }: CellContext<Task, unknown>) => {
				const task = row.original;
				if (editingId === task.id) {
					return (
						<select
							defaultValue={task.status}
							onChange={(e) =>
								(task.status = e.target.value as Task["status"])
							}
							className="border p-1"
						>
							<option value="Pending">Pending</option>
							<option value="Completed">Completed</option>
						</select>
					);
				}
				return task.status;
			},
		},
		{
			header: "Actions",
			cell: ({ row }: CellContext<Task, unknown>) => {
				const task = row.original;
				if (editingId === task.id) {
					return (
						<button
							className="text-green-600 text-sm"
							onClick={() =>
								handleSave(task.id, task.title, task.status)
							}
						>
							Save
						</button>
					);
				}
				return (
					<>
						<button
							className="text-blue-600 text-sm mr-2"
							onClick={() => handleEdit(task.id)}
						>
							Edit
						</button>
						<button
							className="text-red-600 text-sm"
							onClick={() => handleDelete(task.id)}
						>
							Delete
						</button>
					</>
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
		<div className="space-y-6">
			<div className="flex gap-4">
				<input
					type="text"
					value={newTask.title}
					placeholder="Enter task title"
					onChange={(e) =>
						setNewTask({ ...newTask, title: e.target.value })
					}
					className="border px-3 py-2 rounded w-1/2"
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
				<button
					onClick={handleAdd}
					className="bg-blue-600 text-white px-4 py-2 rounded"
				>
					Add
				</button>
			</div>

			<table className="w-full border">
				<thead className="bg-gray-100">
					{table
						.getHeaderGroups()
						.map((headerGroup: HeaderGroup<Task>) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map(
									(header: Header<Task, unknown>) => (
										<th
											key={header.id}
											className="border px-4 py-2 text-left font-semibold"
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
										</th>
									)
								)}
							</tr>
						))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row: Row<Task>) => (
						<tr key={row.id} className="hover:bg-gray-50">
							{row
								.getVisibleCells()
								.map((cell: Cell<Task, unknown>) => (
									<td
										key={cell.id}
										className="border px-4 py-2"
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
	);
}
