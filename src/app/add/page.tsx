import { connect } from "http2";
import { POST } from "../api/route";
import dbConnect from "../utils/dbConnect";
import { redirect } from 'next/navigation'

type Student = {
    stu_id?: number,
    stu_name: string,
    stu_age: number,
    graduated: boolean
}

export default async function AddNewStudent() {

    dbConnect()

    async function addStudent(data) {
        'use server'
        let name = data.get("name")?.valueOf();
        let age = parseInt(data.get("age")?.valueOf());
        console.log("type of age: ", typeof(age))
        let graduated = data.get("graduated")?.valueOf();

        console.log("name: "+ name + ", age: "+ age + ", graduated: "+graduated)
        await POST(name, age, graduated)

        redirect('/')
    }

    return (
        <div className="justify-center my-20">
            <form action={(addStudent)} className='flex flex-col justify-center items-center'>
                <input type='text' name='name' id='name' placeholder='Student Name' required
                    className='shadow-lg rounded-md shadow-black h-10 p-3 mb-6' />
                <input type='text' name='age' id='age' placeholder='Student Age' required
                    className='shadow-lg rounded-md shadow-black h-10 p-3 mb-6' />
                <input type='text' name='graduated' id='graduated' placeholder='True/False' required
                    className='shadow-lg rounded-md shadow-black h-10 p-3 mb-6' />
                <button type='submit' className='bg-orange-500 font-bold text-white hover:bg-red-600 p-3 rounded-md'>SUBMIT</button>
            </form>
        </div>
    );
}
