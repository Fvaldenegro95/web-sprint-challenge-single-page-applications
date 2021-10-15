import React from 'react'
import { Link } from 'react-router-dom'


export default function Home() {
    return (
    <div className='home-wrap'>
            <Link id='order-pizza' to='/pizza'>It's Pizza Time</Link>
    </div>
    )  
}