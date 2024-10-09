import heroImage from '@/assets/heroimage.png'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

export default function Hero () {
    return (
        <div className="w-full h-full flex justify-center items-start sm:flex-col mt-[100px]">
            <div className="w-[70%] sm:w-full h-auto text-5xl sm:text-4xl font-[500] flex flex-col justify-center px-7">
                <h1>
                    Insync is a purpose-built tool for planning and building products, Insync brings all your tasks, teammates, and tools together,
                </h1>
                <p className="text-lg font-medium">
                    Keeps everybody on the same page
                </p>
                <Link to='/register'>
                    <Button className='w-[100px]'>
                        Start building
                    </Button>
                </Link>
            </div>
            <div className='w-[50%] sm:w-full mb-20'>
                <img src={heroImage}/>
            </div>
        </div>
    )
}