import Image from "next/image";
import Head from "next/head";
import ClientLayout from "@/components/layout-client";
import {useCallback, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {UserContext} from "../../context/context";
import {uuidv4} from "@firebase/util";
import ProductTile from "@/pages/ProductTile";
import { isTokenValid, getRole } from '@/utils/JWTVerifier';

export default function ProductList({productsPage, setPageNo, pageNo, title}) {

    const [loading, setLoading] = useState(false);
    const [pageButtons, setPageButtons] = useState([]);
    const [client, setClient] = useState(false);

    const router = useRouter();
    const ctx = useContext(UserContext);
    let isReady = router.isReady;

    const handlePageChange = useCallback((event) => {
        console.log(event.target.value);
        const page = parseInt(event.target.value) - 1;
        setPageNo(page);
    }, [setPageNo])

    useEffect(() => {
    const jwtToken = localStorage.getItem('token');
    if(jwtToken && getRole(jwtToken) === "ROLE_ADMIN")
        router.push("/admin");
    if(jwtToken && getRole(jwtToken) === "ROLE_VENDOR")
        router.push("/vendor");
    if(jwtToken && isTokenValid(jwtToken))
        setClient(true);
    else
        setClient(false);
  }, [])

    useEffect(() => {
            setLoading(true);
            console.log(productsPage)
            if (productsPage.content !== undefined) {
                setLoading(false);
                setPageButtons((oldList) => {
                        let buttons = [];
                        for (let i = 1; i <= productsPage.totalPages; i++) {

                            buttons.push(
                                <li key={uuidv4()}>
                                    <button key={uuidv4()} value={i}
                                            className={`px-3 py-2 leading-tight border border-primary
                                            ${pageNo === i ? 'bg-primary text-white' : 'text-primary bg-white hover:bg-primary hover:text-white'}`}
                                            onClick={handlePageChange}>
                                        {i}
                                    </button>
                                </li>
                            );
                        }
                        return buttons;
                    }
                )
            }
        },
        [ctx.vendorList, handlePageChange, pageNo, productsPage]
    );

    if (loading && isReady)
        return (
            <div className='z-50 h-screen w-screen overflow-hidden'>
                <Image src="/loader.gif" width={1920} height={1080}
                       className="object-cover object-center w-full h-full"/>
            </div>);

    function viewProduct(id) {
        router.push("/productDetails/" + id)
    }

    return (
        <>
            <Head>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/logo.png"/>
                <title>Madrasda | Product List</title>
            </Head>
            {
                productsPage?.content &&
                <ClientLayout client={client}>
                    <section className="body-font font-algeria">
                        <div className="px-5 py-24 mx-auto">
                            <h1 className="text-3xl text-primary md:ml-10 md:mt-4">{title}</h1>
                            <div className="flex flex-wrap justify-center">

                                {productsPage.content.map(product =>

                                    <ProductTile
                                        key={uuidv4()}
                                        id={product.id}
                                        name={product.name}
                                        category={product.category}
                                        total={product.total}
                                        discount={product.discount}
                                        imageUrl={product.colors[0].images[0]}

                                    />
                                )}

                            </div>
                            <br/>
                            <div className="flex justify-center mt-8">
                                <nav aria-label="Page navigation example">
                                    <ul className="inline-flex -space-x-px">
                                        {pageButtons}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </section>
                </ClientLayout>}
        </>
    );

}
;
