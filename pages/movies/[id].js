import Head from "next/head";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import Spinner from "../../components/Spinner/Spinner";
import { axiosInstance as axios } from "../../config/axios.config";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const router = useRouter();
    const [movie, setMovie] = useState({
        uuid: "",
        name: "",
        director: "",
        genre1: "",
        genre2: "",
        genre3: "",
        year: 0,
    });

    //Updates the record on click
    const handleUpdate = async () => {
        try {
            // PUT = update
            // POST = add
            // DELETE = delete
            // can be utilized for loading component on update
            setUpdating(true);
            await axios.put(`api/movies/${router.query.id}`, movie);
            setUpdating(false);

            //TODO: move back to view movies page
        } catch (e) {
            // Log error
            console.log(e);
        }
    };

    // fetches the movie -> called in useEffect below
    async function fetchMovie() {
        setLoading(true);
        const { data } = await axios.get(`api/movies/${router.query.id}`);
        setMovie(data.data);
        setLoading(false);
    }

    useEffect(() => {
        //set UUID from router parameter
        if (!router.isReady) return;
        setMovie({ ...movie, uuid: router.query.id });
        fetchMovie();
    }, [router, router.isReady]);

    return (
        <Layout active={3}>
            <SEO title={"Edit Movie"} />
            <section className="px-32 py-2 mt-28 justify-center items-center">
                <h1 className="text-5xl">Edit Movie</h1>
                <div>
                    {!loading ? (
                        <div className="REPLACE_INSIDE / PLACE FORM INSIDE">
                            <h1>{movie.name}X</h1>
                        </div>
                    ) : (
                        <Spinner />
                    )}
                </div>
            </section>
        </Layout>
    );
}
