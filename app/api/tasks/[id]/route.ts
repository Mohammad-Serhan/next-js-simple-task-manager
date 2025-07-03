import { supabase } from "@/app/lib/supabase";
import { NextResponse } from "next/server";

export async function PUT(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const updateData = await request.json();

		const { data, error } = await supabase
			.from("tasks")
			.update(updateData)
			.eq("id", id)
			.select()
			.single();

		if (error) throw error;

		return NextResponse.json(data);
	} catch (error) {
		console.error("Update error:", error);
		return NextResponse.json(
			{ error: "Task update failed" },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const { error } = await supabase.from("tasks").delete().eq("id", id);

		if (error) throw error;

		return NextResponse.json(
			{ message: "Deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Delete error:", error);
		return NextResponse.json({ error: "Deletion failed" }, { status: 500 });
	}
}
