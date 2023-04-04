import Head from 'next/head'
import VendorLayout from '@/components/layout-vendor'
import Accordion from '@/components/accordian'
import Link from 'next/link'

export default function ResolvedQuery () {
  return (
    <>
    <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
        <title>Resolved Queries</title>
    </Head>
    
    <VendorLayout>
    <main className='md:ml-32 overflow-hidden font-algeria'>
    <div className="px-5 my-10 mx-auto">
        <div className="md:ml-20 md:mt-10">
          <h1 className="body-font text-primary text-3xl">RESOLVED QUERIES</h1>
        </div>

        <hr className="h-px md:ml-20 md:mr-12 my-6 bg-black border-1"></hr>

        <div className='flex mt-4 md:ml-20 lg:mr-20'>
            <div className="container mt-8 bg-[#D9D9D9] rounded-lg w-full">
                <div className="mx-6 my-6">
                    <input type="text" id="large-input" className="block w-full p-14 text-black bg-[#D9D9D9]" readOnly/>
                </div>
            </div>
        </div>

        <div className=" mt-14 flex justify-center ">
            <Link href="/vendor/feedback">
            <button type="button" className="text-white bg-black hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Back</button>
            </Link>
            <Link href="/vendor/unresolvedqueries">
            <button type="button" className="text-white bg-primary hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Un-resolved Queries</button>
            </Link>
        </div>

    </div>
    </main>
    </VendorLayout>
    </>
  )
}
