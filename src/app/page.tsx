import { GET } from "./api/route";
import dbConnect from "./utils/dbConnect";

type Student = {
  stu_id?: number,
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

  return (
    <div className="flex flex-col gap-5">
      <h1>Student Management System</h1>
      <table className="border shadow-md">
        <thead className="border shadow-md">
          <tr>
            <th className="border px-5">Student Id</th>
            <th className="border px-5">Student Name</th>
            <th className="border px-5">Student Age</th>
            <th className="border px-5">Graduated</th>
          </tr>
        </thead>
        <tbody>
          {result.map((dataRow: Student, index: number) => (
            <tr key={index}>
              <td className="border text-center">{index+1}</td>
              <td className="border text-center">{dataRow.stu_name}</td>
              <td className="border text-center">{dataRow.stu_age}</td>
              <td className="border text-center">{dataRow.graduated? 'true': 'false'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="bg-blue-400 p-3 rounded w-32">Add Student</button>
    </div>
  );
}
