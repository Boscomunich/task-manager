import Footer from '@/components/footer'
import NavBar from '@/components/navbar'
import { Outlet } from 'react-router-dom'

export default function Layout () {

    return (
        <div className='overflow-hidden w-full'>
            <NavBar/>
            <Outlet/>
            <Footer/>
        </div>      
    )
}