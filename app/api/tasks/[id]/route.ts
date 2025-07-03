import { supabase } from "@/app/lib/supabase";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(
	request: Request,
	{ params }: { params: Promise<{ id: string }> } // Note the Promise wrapper
) {
	try {
		// 1. AWAIT the params first
		const { id } = await params;

		// 2. Then process the request body
		const updateData = await request.json();

		// 3. Update in Supabase
		const { data, error } = await supabase
			.from("tasks")
			.update(updateData)
			.eq("id", id)
			.select()
			.single();

		if (error) throw error;

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json(
			{ error: "Task update failed" },
			{ status: 500 }
		);
	}
}


export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> } // Async params
) {
	try {
		// 1. AWAIT the params first
		const { id } = await params;

		// 2. Delete from Supabase
		const { error } = await supabase.from("tasks").delete().eq("id", id);

		if (error) throw error;

		return NextResponse.json(
			{ message: "Deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json({ error: "Deletion failed" }, { status: 500 });
	}
}