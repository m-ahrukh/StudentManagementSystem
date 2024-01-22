import Link from "next/link";
import { DELETE, GET } from "./api/route";
import dbConnect from "./utils/dbConnect";
import { redirect } from 'next/navigation'

type Student = {
  student_id?: number,
  stu_name: string,
  stu_age: number,
  graduated: boolean
}
export default async function Home() {

  dbConnect()

  const response = await GET()
  const responseData = await response.json();
  if (!responseData) {
    return null;
  }
  const result = responseData.result || [];

  async function deleteStudent(data: any) {
    'use server'
    let id = parseInt(data.get("id")?.valueOf());

    await DELETE(id)
    redirect('/')
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-center" style={{ fontSize: '24px' }}>Student Management System</h1>
      <table className="border shadow-md">
        <thead className="border shadow-md">
          <tr>
            <th className="border px-5">Student Id</th>
            <th className="border px-5">Student Name</th>
            <th className="border px-5">Student Age</th>
            <th className="border px-5">Graduated</th>
            <th className="border px-5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {result.map((dataRow: Student, index: number) => (
            <tr key={index}>
             
              <td className="border text-center"> {index+1}</td>
              <td className="border text-center">{dataRow.stu_name}</td>
              <td className="border text-center">{dataRow.stu_age}</td>
              <td className="border text-center">{dataRow.graduated ? 'true' : 'false'}</td>
              <td className="border flex flex-row">
                <form action={deleteStudent}>
                  <input type='text' name="id" value={dataRow.student_id} hidden />
                  <button className='bg-red-500 rounded text-white p-1' type='submit'>Delete</button>
                </form>
                <Link href={'/edit/' + dataRow.student_id}>
                  <button className='bg-cyan-500 p-1 rounded'>Update</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href={'/add/'} className="text-center">
        <button className="bg-blue-400 p-3 rounded w-32">
          Add Student
        </button>
      </Link>
    </div>
  );
}
