import { pool } from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET(id:number) {
    console.log("API id: ", id);
    const data = await pool.query("SELECT * FROM student WHERE student_id = $1", [id])
    const result = data.rows[0]
    return NextResponse.json({
        result
    })    
}