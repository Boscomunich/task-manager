import heroImage from '@/assets/heroimage.png'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

export default function Hero () {
    return (
        <div className="w-full min-h-screen h-auto flex justify-center items-center sm:flex-col">
            <div className="w-[70%] sm:w-full text-5xl sm:text-3xl font-[500] flex flex-col justify-center px-7 sm:px-4 gap-3">
                <h1 className='sm:mt-20'>
                    Insync is a purpose-built tool for planning and building products, Insync brings all your tasks, teammates, and tools together,
                </h1>
                <p className="text-lg font-medium">
                    Keeps everybody on the same page
                </p>
                <Link to='/register' className='w-[100px]'>
                    <Button>
                        Start building
                    </Button>
                </Link>
            </div>
            <div className='w-[50%] sm:w-full'>
                <img src={heroImage}/>
            </div>
        </div>
    )
}