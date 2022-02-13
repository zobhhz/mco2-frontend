import React, {useState, useEffect} from 'react'
import tx from "../../data/txlevel.json";


const Radios = ({txLvl, setTxLvl}) => {
  
    return (
        <>
            <label htmlFor="txLvl" className='font-semibold'>
            Transaction Level
            </label>
            <div className='flex flex-col md:flex-row justify-center md:space-x-4'>
            {tx.map((item, index) => {
                return (
                    <div key={index}>
                        <input
                            type="radio"
                            name="txLvl"
                            checked={txLvl === item}
                            value={item}
                            required
                            onChange={(e) => setTxLvl(e.target.value)}
                        />
                        <span>{item}</span>
                    </div>
                )
            })}
            </div>
        </>
    );
}

export default Radios