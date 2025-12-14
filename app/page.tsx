"use client";
import "../styles/globals.css";
import { redirect } from "next/navigation";


const page = () => {
  redirect("/menu");
  return (
    <></>
  );
};

export default page;
