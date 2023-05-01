import ClientLayout from '@/components/layout-client';
import OrderDetailsModal from '@/components/orderdetails-modal';
import Head from 'next/head';
import Image from 'next/image';
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isTokenValid, getRole, getPhone } from "@/utils/JWTVerifier";
import { UserContext } from "context/context";
import axios from "axios";
import {uuidv4} from "@firebase/util";
import {Paper} from "@mui/material";

export default function ClientProfile() {
  const router = useRouter();
  let isReady = router.isReady;
  const ctx = useContext(UserContext);
  const [phone, setPhone] = useState(0);
  const [details, setDetails] = useState([]);
  const [designs, setDesigns] = useState(null);
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState(false);

  const getOrderHistory = async () => {
    const response = await axios.get(
      "https://spring-madrasda-2f6mra4vwa-em.a.run.app/api/transaction/getAllOrdersById/",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setDetails(response.data);
    console.log(response.data);
  };

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // }, []);

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    if (jwtToken && getRole(jwtToken) === "ROLE_ADMIN") router.push("/admin");
    if (jwtToken && getRole(jwtToken) === "ROLE_VENDOR") router.push("/vendor");
    if (jwtToken && isTokenValid(jwtToken)) {
      setClient(true);
      setPhone(getPhone(jwtToken));
      getOrderHistory();
    } else {
      setClient(false);
      router.push("/login");
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
        <title>Madrasda | Profile</title>
      </Head>

      <ClientLayout client={client}>
        <section className='body-font font-algeria bg-off-white'>
          <div className='px-5 py-24 mx-auto'>
            <h1 className='text-3xl font-bold text-primary md:ml-10 md:mt-4'>
              My Profile
            </h1>
            <div className='flex flex-col md:flex-row md:space-x-5 mt-4 ml-16'>
              <h2 className='md:ml-2 title-font font-medium text-lg'>
                Phone Number
              </h2>
              <input
                type='text'
                className='bg-white text-black text-lg outline-none focus:ring-primary cursor-default'
                placeholder={phone}
                readOnly
              />
            </div>

            {details && (
              <h1 className='font-algeria font-bold text-xl mt-10 ml-16'>
                Order History
              </h1>
            )}
            {details && details.length === 0 && (
              <h1 className='ml-16 text-gray text-xl'>No history of orders!</h1>
            )}
            {details &&
              details.map((order) => (
                <Paper key={uuidv4()} className='px-3 md:w-7/12 ml-16 mb-4 mt-8' elevation={7}>
                  <div className='w-full flex flex-col  md:flex-row items-center rounded-lg'>
                    <div className='w-full p-3 ml-4'>
                      <h6 className='font-semibold text-xl text-black'>
                        Order Date :{" "}
                        <span className='font-light'>
                          {order.orderDate
                            .toString()
                            .substring(0, order.orderDate.indexOf("T"))}
                        </span>
                      </h6>
                      <h6 className='font-semibold text-xl text-black'>
                        Order Total :{" "}
                        <span className='font-light'>
                          ₹{Number(order.orderTotal).toLocaleString("en-IN")}
                        </span>
                      </h6>
                      <h6 className='font-semibold text-xl text-black'>
                        Order Items :{" "}
                        <span className='font-light'>
                          {order.orderItems.length}
                        </span>
                      </h6>
                    </div>
                    <div className='w-1/3 '>
                      <OrderDetailsModal order={order} />
                    </div>
                  </div>
                </Paper>
              ))}
          </div>
        </section>
      </ClientLayout>
    </>
  );
}

