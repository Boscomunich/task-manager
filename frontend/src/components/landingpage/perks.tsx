import { motion } from 'framer-motion'
import productImage from '@/assets/perks/linear-product.avif'
import designImage from '@/assets/perks/linear-design.avif'
import createImage from '@/assets/perks/linear-create.avif'
import { Plus } from 'lucide-react'

export default function () {
    return (
        <div className='h-screen'>
            <div className="flex justify-start sm:flex-col sm:gap-2">
                <div className="sm:w-full h-auto text-6xl sm:text-4xl font-[400] flex flex-col justify-center px-7 w-[60%] lg:pl-20">
                        Made for modern product team
                </div>
                <div className="sm:w-full h-auto text-xl font-[400] flex flex-col justify-center px-7 w-[35%]">
                        InSync is driven by the principles that set exceptional product teams apart: unwavering focus, rapid execution, and a dedication to excellence in every detail.
                </div>
            </div>
            <div className='flex justify-start w-auto items-center gap-5 overflow-auto no-scrollbar'>
                <motion.div
                initial={{opacity: 0.5}}
                whileHover={{opacity: 1}}
                className='h-[410px] w-[350px] shrink-0 rounded-xl border overflow-hidden my-5 p-5'>
                    <img src={productImage} className='rounded-md'/>
                    <div className='w-full flex justify-center items-center'>
                        <div className='w-[80%] p-5'>
                            Purpose-built for product development
                        </div>
                        <div className='size-10 flex justify-center items-center rounded-full border shadow-xl hover:scale-110 transition-all duration-200'>
                            <Plus />
                        </div>
                    </div>
                </motion.div>
                <motion.div
                initial={{opacity: 0.3}}
                whileHover={{opacity: 1}}
                className='h-[410px] w-[350px] shrink-0 rounded-xl border overflow-hidden my-5 p-5'>
                    <img src={designImage} className='rounded-md'/>
                    <div className='w-full flex justify-center items-center'>
                        <div className='w-[80%] p-5'>
                            Designed to move fast
                        </div>
                        <div className='size-10 flex justify-center items-center rounded-full border shadow-xl hover:scale-110 transition-all duration-200'>
                            <Plus />
                        </div>
                    </div>
                </motion.div>
                <motion.div
                initial={{opacity: 0.3}}
                whileHover={{opacity: 1}}
                className='h-[410px] w-[350px] shrink-0 rounded-xl border overflow-hidden my-5 p-5'>
                    <img src={createImage} className='rounded-md'/>
                    <div className='w-full flex justify-center items-center'>
                        <div className='w-[80%] p-5'>
                            Crafted for perfection
                        </div>
                        <div className='size-10 flex justify-center items-center rounded-full border shadow-xl hover:scale-110 transition-all duration-200'>
                            <Plus />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}