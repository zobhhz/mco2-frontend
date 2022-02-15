import Head from "next/head";
import Button from "../../components/Button/Button";
import Radios from '../../components/Radios/Radios'
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
    const [txLvl, setTxLvl] = useState("SERIALIZABLE"); // default is SERIALIZABLE
    const [oldYear, setOldYear] = useState(0);

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
            movie.txLvl = txLvl;
            console.log(movie.txLvl);

            // PUT = update
            // POST = add
            // DELETE = delete
            // can be utilized for loading component on update
            setUpdating(true);
            await axios.put(`api/movies/${router.query.id}`, movie);
            setUpdating(false);
        } catch (e) {
            // Log error
            console.log(e);
        } finally {
            // goes back to movies
            router.push('/');
        }
    };

    const handleDelete = async () => {
        try {
            setUpdating(true);
            await axios.delete(`api/movies/${router.query.id}`,{ data: {txLvl,year: oldYear} });
            setUpdating(false);
        } catch (e) {
            console.log(e);
        } finally {
            router.push('/');
        }
    }

    // fetches the movie -> called in useEffect below
    async function fetchMovie() {
        try {
            setLoading(true);
            const { data } = await axios.get(`api/movies/${router.query.id}`);
            setMovie(data.data);
            setOldYear(data.data.year);
            setLoading(false); 
        } catch (e) {
            console.log("FETCH MOVIE ERROR: ",e);
            setLoading(false);
        }
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
                <h1 className="text-2xl md:text-5xl mb-4">Edit Movie</h1>
                
                <div>
                    {!loading ? (
                        <div>
                            <Radios txLvl={txLvl} setTxLvl={setTxLvl}/>
                            <div className='flex flex-col'>
                            <label htmlFor="name" className='font-semibold'>Movie Title</label>
                            <input type="text" value={movie.name} onChange={(e)=> setMovie({...movie, name: e.target.value})} />
                            
                            <div className='flex flex-row my-4'>
                                <div className='flex flex-col w-1/2 mr-4'>
                                <label htmlFor="year" className='font-semibold'>Year</label>
                                <input type="number" value={movie.year} onChange={(e)=> setMovie({...movie, year: parseInt(e.target.value)})} />
                                </div>
                
                                <div className='flex flex-col w-1/2'>
                                <label htmlFor="director" className='font-semibold'>Director</label>
                                <input type="text" value={movie.director} onChange={(e)=> setMovie({...movie, director: e.target.value})} />
                                </div>
                            </div>
                
                            <div className='flex flex-row mb-4'>
                                <div className='flex flex-col w-1/3 mr-4'>
                                <label htmlFor="genre1" className='font-semibold'>Genre 1</label>
                                <input type="text" value={movie.genre1} onChange={(e)=> setMovie({...movie, genre1: e.target.value})} />
                                </div>
                
                                <div className='flex flex-col w-1/3 mr-4'>
                                <label htmlFor="genre2" className='font-semibold'>Genre 2</label>
                                <input type="text" value={movie.genre2} onChange={(e)=> setMovie({...movie, genre2: e.target.value})} />
                                </div>
                
                                <div className='flex flex-col w-1/3'>
                                <label htmlFor="genre3" className='font-semibold'>Genre 3</label>
                                <input type="text" value={movie.genre3} onChange={(e)=> setMovie({...movie, genre3: e.target.value})} />
                                </div>
                            </div>
                            </div>
                            
                            <Button variant="white" className="mr-4" onClick={() => handleDelete()}>Delete</Button>
                            <Button onClick={() => handleUpdate()}>Save</Button>
                        </div>
                    ) : (
                        <Spinner />
                    )}
                </div>
            </section>
        </Layout>
    );
}
