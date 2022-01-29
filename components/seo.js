import React from "react";
import Head from "next/head";

const SEO = ({ title, desc }) => {
    return (
        <Head>
            <title> {title} | Gunita</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
        </Head>
    );
};

export default SEO;