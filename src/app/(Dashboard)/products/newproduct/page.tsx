'use client'
import ProductForm from "@/components/products/ProductForm";
import { useEffect, useState } from "react";


export default function NewProduct() {
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {

            console.log("Token from localStorage:", storedToken);
        }
    }, []);
    return (
        <>
            <p className=" m-6 text-3xl font-bold text-center text-[#857B74] drop-shadow-lg">Edit product</p>
            <div className="flex p-6 justify-center items-center ">

                <ProductForm />
            </div>
        </>
    );
}
