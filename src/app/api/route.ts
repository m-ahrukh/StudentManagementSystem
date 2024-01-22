import { NextResponse } from "next/server"
import { pool } from "../utils/dbConnect"

export async function GET() {
    const data = await pool.query("SELECT * FROM student")
    const result = data.rows
    return NextResponse.json({
        result
    })
}