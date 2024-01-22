import Image from "next/image";
import dbConnect from "./utils/dbConnect";

export default function Home() {

  dbConnect()
  return (
    <div>
      Student Management System
    </div>
  );
}
