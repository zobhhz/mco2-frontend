import Head from 'next/head'
import Button from '../../components/Button/Button'
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import styles from '../../styles/Home.module.css'

export default function Home() {
  return (
    <Layout active={3}>
        <SEO title={"Edit Movie"} />
        <section className="px-32 py-2 mt-28 justify-center items-center">
            <h1 className="text-5xl">Edit Movie</h1>
          
        </section>
    </Layout>
  )
}