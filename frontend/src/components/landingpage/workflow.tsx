import folder from '@/assets/workflow/folder.png'
import meeting from '@/assets/workflow/advertising.png'
import leaf from '@/assets/workflow/leaf.png'
import checklist from '@/assets/workflow/checklist.png'
import brain from '@/assets/workflow/brain.png'
import book from '@/assets/workflow/book.png'
import { motion } from 'framer-motion'
import { useState } from 'react'

const workflowItems = [
    {
        name: 'Project management',
        img: folder,
        content: 'Keeps tasks in order, deadline on track and team members aligned with Insync'
    },
    {
        name: 'Meetings',
        img: meeting,
        content: "Empower your team meetings to be more productive and Empowering"
    },
    {
        name: 'Onboarding',
        img: leaf,
        content: 'Onboarding to a new company or project is a snap with Trello’s visual layout of to-do’s, resources, and progress tracking'
    },
    {
        name: 'Task management',
        img: checklist,
        content: 'Use Trello to track, manage, complete, and bring tasks together like the pieces of a puzzle, and make your team’s projects a cohesive success every time.'
    },
    {
        name: 'Brain storming',
        img: brain,
        content: 'Unleash your team’s creativity and keep ideas visible, collaborative, and actionable.'
    },
    {
        name: 'Resource hub',
        img: book,
        content: 'Save time with a well-designed hub that helps teams find information easily and quickly.'
    }
]

type CardProps = {
    name: string
    img?: string | undefined
    content: string
}

const variant = {
    initial: { scale: 1, rotate: 0 },
    animate: { 
        scale: 1.2, rotate: 15,
        transition: { duration: 0.5 }
    },
}

function Card ({name, content, img}: CardProps) {

    const [isHovered, setIsHovered] = useState(false);

    const handleHover = (state: boolean) => {
        setIsHovered(state);
    };

    return (
        <motion.div 
        onMouseOver={() => handleHover(true)} 
        onMouseOut={() => handleHover(false)}
        className='relative flex flex-col justify-start w-[32%] min-w-[300px] sm:w-[80%] rounded-md shadow-lg overflow-hidden'>
            <div className='w-full bg-blue-500 h-10'></div>
            <motion.div 
            variants={variant}
            initial='initial'
            animate={isHovered ? 'animate' : 'initial'}
            className='absolute w-[60px] h-[60px] m-5 rounded-md bg-white p-3'>
                <img src={img} alt={name}/>
            </motion.div>
            <div className='pt-10 m-5'>
                <h1 className='text-2xl font-semibold'>
                    {name}
                </h1>
                <p className='text-[16px] font-medium'>
                    {content}
                </p>
            </div>
        </motion.div>
    )
}

export default function WorkFlow () {
    return (
        <div className='mt-10'>
            <h1 className=" text-4xl font-bold text-center mb-10">
                Workflows for any project, big or small
            </h1>
            <div className='flex justify-start sm:justify-center md:justify-center flex-wrap gap-5'>
                {
                    workflowItems.map((items, index) => (
                        <Card {...items} key={index}/>
                    ))
                }
            </div>
        </div>
    )
}