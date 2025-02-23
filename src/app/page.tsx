"use client"; // Make this a client component

import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import SignIn from "./(auth)/sign-in/[[...sign-in]]/page";

import SignIn from "@/app/(auth)/signin/page";
import Signup from "@/app/(auth)/signup/page";
import Dashboard from "@/app/(Dashboard)/dashboard/page";
import Products from "@/app/(Dashboard)/products/page";
import Orders from "@/app/(Dashboard)//orders/page";
import Settings from "@/app/(Dashboard)/settings/page";
import Collections from "@/app/(Dashboard)/collections/page";
import NewProduct from "@/app/(Dashboard)/products/newproduct/page";
import CreateCollection from "@/app/(Dashboard)/collections/CreateCollection/page";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Delete, Edit } from "lucide-react";


export default function Home() {

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/products' element={<Products />} />
          <Route path='/collections' element={<Collections />} />
          <Route path='/collections/CreateCollection' element={<CreateCollection />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/products/newproduct' element={<NewProduct />} />
          <Route path='/products/edit' element={<Edit />} />
          <Route path='/products/delete' element={<Delete />} />

        </Routes>
      </BrowserRouter>
    </main>
  );
}

