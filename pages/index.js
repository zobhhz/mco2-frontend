import Head from "next/head";
import { useEffect, useState } from "react";
import Button from "../components/Button/Button";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { useRouter } from "next/router";
import { axiosInstance as axios } from "../config/axios.config"; //IMPORTANT
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Spinner from "../components/Spinner/Spinner";

export default function Home() {
    const router = useRouter();

    const [search, setSearchParam] = useState(router.query?.search || "");
    const [page, setPageParam] = useState(router.query.page || 1);
    const [tx, setTxParam] = useState(router.query?.txLvl || "");
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    console.log(router.query.page);

    async function fetchMovies() {
        setLoading(true);

        const query = {
            search: router.query?.search || search,
            page: router.query?.page || page,
            txLvl: router.query?.txLvl || tx,
        };

        console.log("SEARCH", search);
        if (query.search.trimEnd() === "") delete query.search;
        if (query.txLvl.trimEnd() === "") delete query.txLvl;

        try {
            const result = await axios.get("/api/movies", { params: query });
            setMovies(result.data.data);
            console.log(result);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }
    useEffect(() => {
        fetchMovies();
        return () => {};
    }, []);

    useEffect(() => {
        fetchMovies();
        return () => {};
    }, [router]);

    const handleSearch = () => {
        setPageParam(1);
        const query = {
            search,
            page: 1,
            txLvl: tx,
        };

        if (query.txLvl === "") delete query.txLvl;
        if (query.search === "") delete query.search;
        console.log(query.search);

        router.push({ pathname: "/", query }, undefined, { shallow: true });
    };

    const handleChangePage = (direction) => {
        const newPage = (direction === "next" ? 1 : -1) + parseInt(router.query.page);
        setPageParam(newPage);

        const query = {
            search,
            page: newPage,
            txLvl: tx,
        };

        if (query.page < 1) query.page === 1;
        if (query.txLvl === "") delete query.txLvl;
        if (query.search === "") delete query.search;

        router.push({ pathname: "/", query }, undefined, { shallow: true });
    };
    return (
        <Layout active={0}>
            <SEO title={"All Movies"} />
            <section className="px-32 py-2 mt-28 justify-center items-center">
                {/* Header */}
                <h1 className="text-center text-2xl md:text-6xl">All Movies</h1>

                {/* Search and Add Movie */}
                <div className="flex flex-row justify-between mb-6">
                    {/* Search */}
                    <div className="">
                        <input
                            type="text"
                            className="p-2 max-w-64 w-64 rounded-md"
                            value={search}
                            onChange={(e) => setSearchParam(e.target.value)}
                        />
                        <button
                            className=" ml-1 py-2 px-4 max-h-14 max-w-12 text-base text-white font-bold inline-block text-center h-auto rounded-md bg-purple-400"
                            onClick={() => handleSearch()}
                        >
                            SEARCH
                        </button>
                    </div>
                    <Button variant="purple" to="/movies">
                        Add Movie
                    </Button>
                </div>
                <div className="flex flex-col w-full mb-8">
                    {!loading ? (
                        movies.map((item, index) => {
                            // converts to an array and removes null values
                            const genres = [item.genre1, item.genre2, item.genre3].filter(Boolean);

                            return (
                                <div className="rounded-md shadow-md bg-gray-50 px-8 py-2 mb-8 h-32" key={index}>
                                    <Link href={`movies/${item.uuid}`}>
                                        <a className="text-2xl md:text-2xl font-semibold hover:underline">
                                            {item.name}
                                        </a>
                                    </Link>
                                    {item.director ? <p>by {item.director}</p> : null}

                                    {/** GENRES */}
                                    <div className="flex flex-row flex-start space-x-1">
                                        {genres.map((g, i2) => (
                                            <span
                                                key={i2}
                                                className="rounded-full bg-purple-300 px-2 py-0.5 text-xs text-white"
                                            >
                                                {g}
                                            </span>
                                        ))}
                                    </div>
                                    <p>There is no description for this movie. </p>
                                </div>
                            );
                        })
                    ) : (
                        <Spinner />
                    )}
                </div>
                {/** PAGINATION */}
                <div className={`flex justify-between ${router.query.page <= 1 ? "flex-row-reverse" : "flex-row"} }`}>
                    {router.query.page > 1 ? (
                        <button
                            className="ml-1 py-2 px-4 max-h-14 max-w-12 text-base text-white font-bold inline-block text-center h-auto rounded-md bg-purple-400"
                            onClick={() => handleChangePage("prev")}
                        >
                            Previous
                        </button>
                    ) : null}{" "}
                    <button
                        className={`ml-1 py-2 px-4 max-h-14 max-w-12 text-base text-white font-bold inline-block text-center h-auto rounded-md bg-purple-400 ${
                            movies.length === 10 ? "block" : "hidden"
                        }`}
                        onClick={() => handleChangePage("next")}
                    >
                        Next
                    </button>
                </div>
            </section>
        </Layout>
    );
}
