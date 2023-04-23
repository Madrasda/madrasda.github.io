import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isTokenValid, getRole } from "@/utils/JWTVerifier";
import SearchVendor from "@/components/search-vendor";
import AdminLayout from "@/components/layout-admin";

export default function Hotsellers() {
  const [tokenExists, setTokenExists] = useState(false);
  const [products, setProducts] = useState([]);

  const router = useRouter();
  let isReady = router.isReady;
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/product/hotsellers",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setProducts(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    if (jwtToken && getRole(jwtToken) === "ROLE_CUSTOMER") router.push("/");
    if (jwtToken && getRole(jwtToken) === "ROLE_VENDOR") router.push("/vendor");
    if (jwtToken === undefined || !isTokenValid(jwtToken))
      router.push("/vendor");
    else {
      setTokenExists(true);
      getAllProducts();
    }
  }, []);

  if (loading && isReady)
    return (
      <div className='z-50 h-screen w-screen overflow-hidden'>
        <Image
          src='/loader.gif'
          width={1920}
          height={1080}
          className='object-cover object-center w-full h-full'
        />
      </div>
    );
  return (
    <>
      <Head>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/logo.png' />
        <title>Madrasda | Hotsellers</title>
      </Head>

      <AdminLayout>
        <main className='body-font overflow-hidden font-algeria md:ml-32'>
          <div className='px-5 my-10 mx-auto'>
            <h1 className='text-3xl text-primary md:ml-20 md:mt-10'>
              HOTSELLERS
            </h1>

            <div className='mt-4 md:ml-20'>
              <section className="text-gray-600 body-font bg-[url('/templates-bg.png')] bg-no-repeat bg-cover">
                <div className='px-5 py-52 lg:mx-32'>
                  <div className='flex flex-wrap lg:flex-nowrap justify-center'>
                    {!products && (
                      <h1 className='text-5xl font-black text-center text-white'>
                        No products to show!
                      </h1>
                    )}
                    {products &&
                      products.map((product) => {
                        return (
                          <div className='lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer bg-off-white mx-4 my-2 rounded drop-shadow-[8px_8px_10px_rgba(0,0,0,0.3)] hover:drop-shadow-[8px_8px_4px_rgba(0,0,0,0.4)] duration-300 ease-in-out'>
                            <div className='block relative h-48 rounded overflow-hidden'>
                              <Image
                                src={product.colors[0].images[0]}
                                alt='ecommerce'
                                width={1080}
                                height={1920}
                                className='object-contain object-center w-full h-full block'
                              />
                            </div>
                            <div className='mt-4'>
                              <h2 className='title-font text-base font-medium'>
                                {product.name}
                              </h2>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </AdminLayout>
    </>
  );
}