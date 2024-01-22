import { NextResponse } from "next/server"
import { pool } from "../utils/dbConnect"

export async function GET() {
    const data = await pool.query("SELECT * FROM student")
    const result = data.rows
    return NextResponse.json({
        result
    })
}

export async function POST(name, age, graduated) {
    try {
        const newNote = await pool.query("INSERT INTO student(stu_name, stu_age, graduated) VALUES ($1, $2, $3) RETURNING *", [name, age, graduated])
        console.log("In API fle: " , newNote.rows[0])
        const result = newNote.rowCount[0]
        return NextResponse.json({
            result
        })
    }
    catch (err) {
        console.log("Error ", err) 
    }
}

export async function DELETE(id: number){
    try{
        const deletedStudent = await pool.query('DELETE FROM student WHERE student_id = $1', [id])
        return NextResponse.json({
            deletedStudent
        })
    }
    catch(err){
        console.log("Error ", err)
    }
}
