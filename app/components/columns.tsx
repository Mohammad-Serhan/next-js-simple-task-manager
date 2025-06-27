"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Task } from "../data/mockData";
import { Badge } from "@/components/ui/badge";

export const taskColumns: ColumnDef<Task>[] = [
	{ accessorKey: "title", header: "Title" },
	{ accessorKey: "description", header: "Description" },
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const value = row.original.status;
			return (
				<Badge variant={value === "Completed" ? "default" : "outline"}>
					{value}
				</Badge>
			);
		},
	},
	{
		accessorKey: "priority",
		header: "Priority",
		cell: ({ row }) => { 
			const value = row.original.priority;
			return (
				<Badge
					className={
						value === "High"
							? "bg-red-500 text-white"
							: value === "Medium"
							? "bg-yellow-400 text-black"
							: "bg-green-500 text-white"
					}
				>
					{value}
				</Badge>
			);
		},
	},
];
