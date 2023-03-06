import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import SearchVendor from "@/components/search-vendor";
import VendorLayout from "@/components/layout-vendor";

export default function TemplateList() {
  return (
    <>
    <Head>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/logo.png" />
      <title>Madrasda | Create Template</title>
    </Head>
    
    <VendorLayout>
    <section className="body-font ml-36 overflow-hidden">
      <div className="px-5 my-10 mx-auto">
        <h1 className="text-4xl text-primary ml-20">CREATE TEMPLATE</h1>
        <div className="flex items-center justify-center m-5">
          <SearchVendor />
        </div>
        <div className="flex flex-wrap justify-center">
          
        <div className="lg:w-1/4 md:w-1/2 p-4 w-full h-96 flex items-center justify-center m-5 rounded duration-200 ease-in-out">  
          <Link href="/vendor/createtemplate" >
          <div className="flex flex-col items-center justify-center cursor-pointer">
            <Image src="/plus-icon.png" width={50} height={50}/>
            <p className="font-semibold font-base">Create more templates</p>
            <p className="font-light text-gray font-sm">Add them to your merch and start selling</p>
          </div>
          </Link>
        </div>
          
        <div className="lg:w-1/4 md:w-1/2 p-4 w-full h-full cursor-pointer bg-off-white m-5 rounded drop-shadow-[4px_4px_10px_rgba(0,0,0,0.2)] hover:drop-shadow-[8px_8px_4px_rgba(0,0,0,0.3)] duration-200 ease-in-out">
            <a className="block relative h-fit rounded overflow-hidden">
                <Image src="/v-tee.png" 
                alt="ecommerce" 
                height={1080}
                width={1920} 
                className="object-contain object-center w-full h-full" />
            </a>
            <div className="mt-4">
                <h3 className="text-base title-font">Vikram Hoodies</h3>
                <div className="flex">
                    <h2 className="title-font text-sm text-gray">Technique:</h2>
                    <p className="pl-1 text-gray text-sm">PRINT</p>
                </div>
                <span className="mt-1 text-gray pr-1 text-sm">Sizes:</span>
                <span className="mt-1 text-gray pr-1 text-sm">S,M,L,XL,XXL,XXXL,4XL,5XL </span>
            </div>
        </div>

        <div className="lg:w-1/4 md:w-1/2 p-4 w-full h-full cursor-pointer bg-off-white m-5 rounded drop-shadow-[4px_4px_10px_rgba(0,0,0,0.2)] hover:drop-shadow-[8px_8px_4px_rgba(0,0,0,0.3)] duration-200 ease-in-out">
            <a className="block relative h-fit rounded overflow-hidden">
                <Image src="/v-tee.png" 
                alt="ecommerce" 
                height={1080}
                width={1920} 
                className="object-contain object-center w-full h-full" />
            </a>
            <div className="mt-4">
                <h3 className="text-base title-font">Vikram Hoodies</h3>
                <div className="flex">
                    <h2 className="title-font text-sm text-gray">Technique:</h2>
                    <p className="pl-1 text-gray text-sm">PRINT</p>
                </div>
                <span className="mt-1 text-gray pr-1 text-sm">Sizes:</span>
                <span className="mt-1 text-gray pr-1 text-sm">S,M,L,XL,XXL,XXXL,4XL,5XL </span>
            </div>
        </div>

        <div className="lg:w-1/4 md:w-1/2 p-4 w-full h-full cursor-pointer bg-off-white m-5 rounded drop-shadow-[4px_4px_10px_rgba(0,0,0,0.2)] hover:drop-shadow-[8px_8px_4px_rgba(0,0,0,0.3)] duration-200 ease-in-out">
            <a className="block relative h-fit rounded overflow-hidden">
                <Image src="/v-tee.png" 
                alt="ecommerce" 
                height={1080}
                width={1920} 
                className="object-contain object-center w-full h-full" />
            </a>
            <div className="mt-4">
                <h3 className="text-base title-font">Vikram Hoodies</h3>
                <div className="flex">
                    <h2 className="title-font text-sm text-gray">Technique:</h2>
                    <p className="pl-1 text-gray text-sm">PRINT</p>
                </div>
                <span className="mt-1 text-gray pr-1 text-sm">Sizes:</span>
                <span className="mt-1 text-gray pr-1 text-sm">S,M,L,XL,XXL,XXXL,4XL,5XL </span>
            </div>
        </div>

        <div className="lg:w-1/4 md:w-1/2 p-4 w-full h-full cursor-pointer bg-off-white m-5 rounded drop-shadow-[4px_4px_10px_rgba(0,0,0,0.2)] hover:drop-shadow-[8px_8px_4px_rgba(0,0,0,0.3)] duration-200 ease-in-out">
            <a className="block relative h-fit rounded overflow-hidden">
                <Image src="/v-tee.png" 
                alt="ecommerce" 
                height={1080}
                width={1920} 
                className="object-contain object-center w-full h-full" />
            </a>
            <div className="mt-4">
                <h3 className="text-base title-font">Vikram Hoodies</h3>
                <div className="flex">
                    <h2 className="title-font text-sm text-gray">Technique:</h2>
                    <p className="pl-1 text-gray text-sm">PRINT</p>
                </div>
                <span className="mt-1 text-gray pr-1 text-sm">Sizes:</span>
                <span className="mt-1 text-gray pr-1 text-sm">S,M,L,XL,XXL,XXXL,4XL,5XL </span>
            </div>
        </div>

        <div className="lg:w-1/4 md:w-1/2 p-4 w-full h-full cursor-pointer bg-off-white m-5 rounded drop-shadow-[4px_4px_10px_rgba(0,0,0,0.2)] hover:drop-shadow-[8px_8px_4px_rgba(0,0,0,0.3)] duration-200 ease-in-out">
            <a className="block relative h-fit rounded overflow-hidden">
                <Image src="/v-tee.png" 
                alt="ecommerce" 
                height={1080}
                width={1920} 
                className="object-contain object-center w-full h-full" />
            </a>
            <div className="mt-4">
                <h3 className="text-base title-font">Vikram Hoodies</h3>
                <div className="flex">
                    <h2 className="title-font text-sm text-gray">Technique:</h2>
                    <p className="pl-1 text-gray text-sm">PRINT</p>
                </div>
                <span className="mt-1 text-gray pr-1 text-sm">Sizes:</span>
                <span className="mt-1 text-gray pr-1 text-sm">S,M,L,XL,XXL,XXXL,4XL,5XL </span>
            </div>
        </div>

        </div>
      </div>
    </section>
    </VendorLayout>
    </>
  );
}