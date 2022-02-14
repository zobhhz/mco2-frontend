import Head from 'next/head'
import Button from '../../components/Button/Button'
import Radios from '../../components/Radios/Radios'
import { useRouter } from "next/router"
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import styles from '../../styles/Home.module.css'
import { useState } from 'react'
import { axiosInstance as axios } from '../../config/axios.config'

export default function Home() {
  const router = useRouter();
  const [txLvl, setTxLvl] = useState("SERIALIZABLE"); // default is SERIALIZABLE

  // const [movie, setMovie] = useState({
  //   name: "Alyssa",
  //   director: "Palmares",
  //   genre1: "1",
  //   genre2: "2",
  //   genre3: "3",
  //   year: 2019,
  // });

  const [movie, setMovie] = useState({
    name: "",
    director: "",
    genre1: "",
    genre2: "",
    genre3: "",
    year: 1800,
  });

  const handleSubmit = async () => {
    movie.txLvl = txLvl;
    console.log(movie.txLvl);
    try {
      await axios.post("/api/movies", movie);
    } catch(e) {
      console.log(e);
    } finally {
      // goes back to movies
      router.push('/');
    }

  };

  return (
    <Layout active={2}>
        <SEO title={"Add a Movie"} />
        <section className="px-32 py-2 mt-28 justify-center items-center">
          <h1 className="text-5xl mb-4">Add Movie</h1>

          {/* Inputs */}
          <div>
            <Radios txLvl={txLvl} setTxLvl={setTxLvl}/>
            <div className='flex flex-col'>
              <label htmlFor="name" className='font-semibold'>Movie Title</label>
              <input type="text" value={movie.name} onChange={(e)=> setMovie({...movie, name: e.target.value})} />
              
              <div className='flex flex-row my-4'>
                <div className='flex flex-col w-1/2 mr-4'>
                  <label htmlFor="year" className='font-semibold'>Year</label>
                  <input type="number" min={1800} value={movie.year} onChange={(e)=> setMovie({...movie, year: parseInt(e.target.value)})} />
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
            
            <Button to='/' onClick={() => handleSubmit()}>Add Movie</Button>
          </div>
        </section>
    </Layout>
  )
}