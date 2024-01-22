import { GET } from "@/app/api/edit/[id]/route";
import { PATCH } from "@/app/api/route";
import dbConnect, { pool } from "@/app/utils/dbConnect";
import { redirect } from "next/navigation";

type Student = {
    stu_id?: number,
    stu_name: string,
    stu_age: number,
    graduated: boolean
}

export default async function UpdateStudentDetails({ params }) {
    
    dbConnect()

    let id = params.id
    const response = await GET(id)
    const responseData = await response.json();

    if(!responseData){
        return null;
    }
    const result = responseData.result;
    console.log("result->", result)

    async function editDetails(data){
        'use server'

        let name = data.get("name")?.valueOf();
        let age = parseInt(data.get("age")?.valueOf());
        let graduated = data.get("graduated")?.valueOf();

        PATCH(name, age, graduated, id);
        redirect('/')
    }
    
    return (
        <div className="flex flex-col gap-5">
            <form action={editDetails} className='flex flex-col justify-center items-center'>
                <input type='text' name='name' id='name' placeholder='Student Name' required
                    defaultValue={result.stu_name}
                    className='shadow-lg rounded-md shadow-black h-10 p-3 mb-6' />
                <input type='text' name='age' id='age' placeholder='Student Age' required
                    defaultValue={result.stu_age}
                    className='shadow-lg rounded-md shadow-black h-10 p-3 mb-6' />
                <input type='text' name='graduated' id='graduated' placeholder='True/False' required
                    defaultValue={result.graduated}
                    className='shadow-lg rounded-md shadow-black h-10 p-3 mb-6' />
                <button type='submit' className='bg-orange-500 font-bold text-white hover:bg-red-600 p-3 rounded-md'>SUBMIT</button>
            </form>
        </div>
    );
}
