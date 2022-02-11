import Head from 'next/head'
import Button from '../components/Button/Button'
import Layout from '../components/layout'
import SEO from '../components/seo'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Layout active={0}>
      <SEO title={"All Movies"} />
      <section className="px-32 py-2 mt-28 justify-center items-center">
        {/* Header */}
        <h1 className="text-center text-6xl">All Movies</h1>
        
        {/* Search and Add Movie */}
        <div className='flex flex-row justify-between'>
          {/* Search */}
          <div className=''>

          </div>
          <Button variant="purple" to="/movies">Add Movie</Button>
        </div>
      </section>
    </Layout>
  )
}
