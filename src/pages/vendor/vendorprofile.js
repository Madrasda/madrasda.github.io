import VendorLayout from '@/components/layout-vendor'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link';
import axios from "axios";
import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import { isTokenValid } from "@/utils/JWTVerifier"


export default function VendorProfile() {

  const [tokenExists, setTokenExists] = useState(false)
  const router = useRouter();
  useEffect(() => {
    const jwtToken = localStorage.getItem("token")
    if(jwtToken === undefined || !isTokenValid(jwtToken))
      router.push("/vendor");
    else
      setTokenExists(true);
  }, []);

  return (
    <>
     <Head>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/logo.png" />
      <title>Madrasda | Vendor Profile</title>
    </Head>

    <VendorLayout>
    <section className="body-font font-algeria overflow-hidden md:ml-56 lg:ml-36">
      <div className="px-5 my-10 mx-auto lg:ml-20 md:mt-10">
        <h1 className="text-3xl text-primary">PROFILE</h1>
        <div className="grid gap-6 mt-10 ml-2 mb-2 
                            md:grid-row
                            lg:mr-96">
                <div>
                    <label for="first_name" className="block mb-2 text-lg font-medium text-black">Company Name :</label>
                    <input type="text" className="bg-black-50 border-b border-gray text-black text-sm block w-full p-2.5" placeholder="Display Name" required>
                    </input>
                </div>
                <div>
                    <label for="last_name" className="block mb-2 text-lg font-medium text-black">Copmany URL :</label>
                    <input type="text" className="bg-black-50 border-b  border-gray  text-black text-sm block w-full p-2.5" placeholder="Website URL" required>
                    </input>
                </div>
                <div>
                    <label for="company" className="block mb-2 text-lg font-medium text-black">Email :</label>
                    <input type="text" className="bg-black-50 border-b  border-gray  text-black text-sm block w-full p-2.5" placeholder="example@gmail.com" required>
                    </input>
                </div>  
                <div>
                    <label for="phone" className="block mb-2 text-lg font-medium text-black ">Phone Number :</label>
                    <input type="text" className="bg-black-50 border-b  border-gray  text-black text-sm block w-full p-2.5" placeholder="+919XXXXXXXXX" required>
                    </input>
                </div>
                <div className=" mt-14 flex justify-center ">
                <Link href="/vendor/changepassword">
                  <button type="button" class="text-white bg-black font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Change Password</button>
                </Link>
                <Link href ="/vendor">
                  <button type="button" class="text-white bg-primary font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Logout</button>
                </Link>
                </div>
            </div>
      </div>
    </section>
    </VendorLayout>
    </>
  )
}
