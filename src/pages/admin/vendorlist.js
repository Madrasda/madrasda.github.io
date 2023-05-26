import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import AdminLayout from "@/components/layout-admin";
import AddVendorModal from "@/components/addvendor-modal";
import VendorListItem from "@/components/vendorlist-item";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {storage} from "../../firebaseConfig";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {v4} from "uuid";
import {getRole} from "@/utils/JWTVerifier";
import {uuidv4} from "@firebase/util";
import {Alert, Grow, Snackbar} from "@mui/material";

export default function VendorList(props) {
   const router = useRouter();
   const [tokenExists, setTokenExists] = useState(false);
   const [vendors, setVendors] = useState(null);
   const [imageUrl, setImage] = useState("");
   const [vendorData, setVendor] = useState({});
   const [message, setMessage] = useState("");
   const [severity, setSeverity] = useState("");
   const [open, setOpen] = useState(false);
   let isReady = router.isReady;

   const handleClose = (event, reason) => {
     console.log(reason);
     if (reason === "clickaway") {
       return;
     }

     setOpen(false);
   };

   const getVendors = async () => {
     axios
       .get(
         "https://spring-madrasda-2f6mra4vwa-em.a.run.app/api/admin/getVendors"
       )
       .then((response) => {
         setVendors(response.data);
       })
       .catch((err) => {
         console.log(err);
       });
   };

   const handleSubmit = (formData) => {
     registerVendor(formData);
   };

   const uploadImageOnline = async (file) => {
     const imageRef = ref(storage, `vendors/${file.name + v4()}`);
     await uploadBytes(imageRef, file);
     const url = await getDownloadURL(imageRef);
     return url;
   };

   const registerVendor = async (data) => {
     if (data.imgUrl === null) {
		setOpen(true);
		setMessage("Please add an image");
		setSeverity('error');
       return;
     }
     const url = await uploadImageOnline(data.imgUrl);
     console.log(data);
     axios
       .post(
         "https://spring-madrasda-2f6mra4vwa-em.a.run.app/api/admin/addVendor",
         {
           ...data,
           imgUrl: url,
         }
       )
       .then((response) => {
         getVendors();
       })
       .catch((err) => {
         console.log(err);
       });
   };

	const deleteVendor = async (vendorId) => {
		const response = await axios.delete(
			"https://spring-madrasda-2f6mra4vwa-em.a.run.app/api/admin/deleteVendor/" + vendorId, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem('token_admin')
				}
			}
		);
		getVendors();
	}


	useEffect(() => {
		const jwtToken = localStorage.getItem("token_admin");
		if (jwtToken && getRole(jwtToken) !== "ROLE_ADMIN") router.push("/admin");
		else {
			setTokenExists(true);
			getVendors();
		}
	}, []);

	return (
    <>
      <Head>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/logo.png' />
        <title>Madrasda | Creator List</title>
      </Head>
      <Snackbar
        className={"mt-7"}
        open={open}
        autoHideDuration={1400}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      {tokenExists && (
        <AdminLayout>
          <section
            className='body-font overflow-hidden font-quest
                        md:ml-32'>
            <div className='mt-20 px-5 md:my-10 mx-auto'>
              <h1
                className='text-3xl text-primary
                       md:ml-20 m-5'>
                Manage Creators
              </h1>
              <div className='flex flex-wrap justify-between md:ml-20'>
                <div className='lg:w-1/6 md:w-3/4 p-4 w-full lg:h-80 md:h-96 h-80 flex items-center justify-center m-5 rounded duration-200 ease-in-out'>
                  <Link href='#'>
                    <div className='flex flex-col items-center justify-center cursor-pointer'>
                      <AddVendorModal getFormData={handleSubmit} />
                      <p className='font-semibold text-base text-center pt-2'>
                        Add new creator
                      </p>
                      <p className='font-light text-shadowGrey text-sm text-center'>
                        Add new creators to your list
                      </p>
                    </div>
                  </Link>
                </div>

                {vendors !== null &&
                  vendors.map((vendor, index) => {
                    const delay = 80 * index + "ms";
                    return (
                      <Grow
                        key={uuidv4()}
                        in
                        style={{ transitionDelay: delay }}
                        timeout={500}>
                        <div
                          key={uuidv4()}
                          className='lg:w-1/6 md:w-3/4 p-4 pb-0 min-h-fit h-80 w-full cursor-pointer
                                              bg-off-white m-5 rounded shadow-xl transition-shadow
                                               hover:shadow-shadowGrey border border-border'>
                          <Link href={`/admin/vendorDetails/${vendor.id}`}>
                            <VendorListItem
                              key={vendor.id}
                              vendorName={vendor.name}
                              image={vendor.imgUrl}
                            />
                          </Link>
                        </div>
                      </Grow>
                    );
                  })}
              </div>
            </div>
          </section>
        </AdminLayout>
      )}
    </>
  );
							}
