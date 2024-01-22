import { GET } from "@/app/api/edit/[id]/route";
import { PATCH } from "@/app/api/route";
import dbConnect, { pool } from "@/app/utils/dbConnect";
import { redirect } from "next/navigation";


export default async function UpdateStudentDetails({ params }: any) {

    dbConnect()

    let id = params.id
    const response = await GET(id)
    const responseData = await response.json();

    if (!responseData) {
        return null;
    }
    const result = responseData.result;
    console.log("result->", result)

    async function editDetails(data: any) {
        'use server'

        let name = data.get("name")?.valueOf();
        let age = parseInt(data.get("age")?.valueOf());
        let graduated = data.get("graduated")?.valueOf();

        PATCH(name, age, graduated, id);
        redirect('/')
    }

    return (
        <div className="flex flex-col gap-5 my-10">
            <h1 className="text-center" style={{ fontSize: '24px' }}>Update Student Details</h1>
            <div className="flex flex-col gap-5">
                <form action={editDetails} className='flex flex-col justify-center items-center'>
                    <div className="flex flex-col">
                        <label>Student Name</label>
                        <input type='text' name='name' id='name' placeholder='Student Name' required
                            defaultValue={result.stu_name}
                            className='shadow-lg rounded-md shadow-black h-10 p-3 mb-6' />
                    </div>
                    <div className="flex flex-col">
                        <label>Student Age</label>
                        <input type='text' name='age' id='age' placeholder='Student Age' required
                            defaultValue={result.stu_age}
                            className='shadow-lg rounded-md shadow-black h-10 p-3 mb-6' />
                    </div>
                    <div className="flex flex-col">
                        <label>Is Graduated?</label>
                        <input type='text' name='graduated' id='graduated' placeholder='True/False' required
                            defaultValue={result.graduated}
                            className='shadow-lg rounded-md shadow-black h-10 p-3 mb-6' />
                    </div>
                    <button type='submit' className='bg-orange-500 font-bold text-white hover:bg-red-600 p-3 rounded-md'>SUBMIT</button>
                </form>
            </div>
        </div>
    );
}
