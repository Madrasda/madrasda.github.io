import Head from 'next/head'
import AdminLayout from '@/components/layout-admin'
import Link from 'next/link'
import axios from "axios";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getRole, isTokenValid} from "@/utils/JWTVerifier";
import VendorQuery from '@/components/vendor-query';

export default function Queries() {
    const router = useRouter();
    const [queries, setQueries] = useState(null);
    const [pageNo, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(0);
    const [tokenExists, setTokenExists] = useState(false);
    let isReady = router.isReady;
    const setResolution = (queryId) => {
        setQueries(oldSet => [...oldSet.map(query => {
                    if (query.id === queryId) query.resolve = !query.resolve;
                    return query;
                }
            )]
        );

    }
    const getQueries = async () => {
        const url = new URLSearchParams({
            pageNo: pageNo,
            pageSize: 4
        })
        axios.get(
            "https://spring-madrasda-2f6mra4vwa-em.a.run.app/api/feedback/getAllQueries?" + url
        ).then((response) => {
            setQueries(response.data.unresolvedQueries.content);
            setPageSize(response.data.unresolvedQueries.totalPages);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getQueries();
    }, [pageNo]);

    useEffect(() => {
        const jwtToken = localStorage.getItem("token")
        if (jwtToken && getRole(jwtToken) === "ROLE_CUSTOMER")
            router.push("/");
        if (jwtToken && getRole(jwtToken) === "ROLE_VENDOR")
            router.push("/vendor");
        if (jwtToken === undefined || !isTokenValid(jwtToken))
            router.push("/admin");
        else
            setTokenExists(true);
    }, []);


    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/logo.png"/>
                <title>Un-Resolved Queries</title>
            </Head>

            <AdminLayout>
                <main className='md:ml-32 overflow-hidden font-algeria'>
                    <div className="px-5 my-10 mx-auto">
                        <div className="md:ml-20 md:mt-10">
                            <h1 className="body-font text-primary text-3xl">UNRESOLVED QUERIES</h1>
                        </div>

                        <hr className="h-px md:ml-20 md:mr-12 my-6 bg-black border-1"></hr>

                        <div className='flex flex-col mt-4 md:ml-20 lg:mr-20'>
                            {queries &&
                                queries.map((q) => {
                                    return (
                                        <VendorQuery
                                            key={q.id}
                                            queryId={q.id}
                                            name={q.vendorName}
                                            query={q.query}
                                            email={q.email}
                                            setResolution={setResolution}
                                        />
                                    )
                                })
                            }
                            {
                                queries && queries.length === 0 &&
                                <h1 className='text-center text-xl text-gray font-light'>
                                    No queries to be solved
                                </h1>
                            }
                        </div>
                        {
                            queries && queries.length !== 0 &&
                            <div className="flex justify-center mt-32">
                                <button
                                    className="bg-[#a51535] hover:bg-[#560b21] text-white font-small py-2 px-4 rounded-l"
                                    onClick={
                                        () => {
                                            setPage(pageNo === 0 ? 0 : pageNo - 1)
                                        }
                                    }>
                                    Prev
                                </button>
                                <button
                                    className="bg-[#a51535] hover:bg-[#560b21] text-white font-small py-2 px-4 rounded-r"
                                    onClick={
                                        () => {
                                            setPage(pageNo === pageSize - 1 ? pageNo : pageNo + 1)
                                        }
                                    }>
                                    Next
                                </button>
                            </div>
                        }
                        <div className='mt-14 flex justify-center'>
                            <Link href="/admin/resolvedqueries">
                                <button type="button" className="mt-2 text-white bg-primary font-medium rounded-full text-sm px-5 py-2.5
          text-center mr-2 mb-2">Resolved Queries
                                </button>
                            </Link>
                        </div>
                    </div>
                </main>
            </AdminLayout>
        </>
    )
}
