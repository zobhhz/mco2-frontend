import React from "react";
import styles from "./Navigation.module.scss";
import data from "../../data/navigation.json";
import NavItem from "../NavItem/NavItem";

const Navigation = ({active}) => {
    return (
        <>
            <div className={`${styles.container} px-32 py-2 flex flex-row justify-between items-center relative`}>
                <h1 className="text-3xl">Gunita</h1>
                <div className="flex flex-row justify-start items-start gap-6">
                    <ul className="list-none hidden md:block">
                        {data.map((item, index) => (
                            <NavItem
                                active={index == active}
                                key={index}
                                name={item.name}
                                link={item.link}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    ); 
};

export default Navigation