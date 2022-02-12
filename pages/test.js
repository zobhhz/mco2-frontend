import React, { useState, useEffect } from "react";
import { axiosInstance } from "../config/axios.config";

const Test = () => {
    let [loading, setLoading] = useState(true);
    let [movies, setMovies] = useState([]);

    async function getMovies() {
        setLoading(true);
        try {
            const { data } = await axiosInstance.get(`/api/movies`);
            console.log("DATA", data.data);
            setLoading(false);
            setMovies(data.data);
        } catch (e) {
            // return empty array
            console.log(e);
            setLoading(false);
            setMovies([]);
        }
    }

    useEffect(() => {
        setLoading(true);
        getMovies();
        console.log("MOVIES", movies);
        setLoading(false);

        return () => {};
    }, []);

    return (
        <div>
            {loading ? (
                "Loading"
            ) : (
                <div>
                    {movies.map((item, index) => {
                        return (
                            <div key={index}>
                                <p>
                                    {index}.) {item.name}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Test;
