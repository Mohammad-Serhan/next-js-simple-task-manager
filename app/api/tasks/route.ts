import { supabase } from "@/app/lib/supabase";
import { NextResponse } from "next/server";

//  
export async function GET() {
	const { data, error } = await supabase.from("tasks").select("*");
	if (error)
		return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json(data);
}

//   
export async function POST(req: Request) {
	const body = await req.json();
	const { title, description, status, priority } = body;

	const { data, error } = await supabase
		.from("tasks")
		.insert([{ title, description, status, priority }])
		.select();

	if (error)
		return NextResponse.json({ error: error.message }, { status: 500 });

	return NextResponse.json(data?.[0]);
}
