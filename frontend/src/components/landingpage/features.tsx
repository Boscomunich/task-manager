import boardImage from '@/assets/features/featureimage.png'
import listImage from '@/assets/features/list.png'
import cardImage from '@/assets/features/card.png'
import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import clsx from 'clsx';

const imgs = [
    boardImage,
    listImage,
    cardImage
];

const features = [
    {
        name: 'Boards',
        description: 'Keeps task organized and keeps work moving forward, see the diffrent statages of your project in a glance'
    },
    {
        name: 'Lists',
        description: 'Represent diffrent stages of a project. Starts as simple as Todo, Doing, Done or build a workflow custome fit for your team'
    },
    {
        name: 'Cards',
        description: 'Cards represent task and ideas and hold all information to get the job done, as you make progress move cards across list to show their status'
    },
]

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
    type: "spring",
    mass: 3,
    stiffness: 400,
    damping: 50,
};

const Images = ({ imgIndex }: {imgIndex: number}) => {
    return (
        <>
        {imgs.map((imgSrc, idx) => {
            return (
            <motion.div
                key={idx}
                style={{
                backgroundImage: `url(${imgSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                }}
                animate={{
                scale: imgIndex === idx ? 0.95 : 0.85,
                }}
                transition={SPRING_OPTIONS}
                className="aspect-video w-full shrink-0 rounded-xl  object-cover"
            />
            );
        })}
        </>
    );
};

const Dots = ({ imgIndex, setImgIndex }: {imgIndex: number, setImgIndex: (idx: number) => void}) => {
    return (
        <div className="mt-4 flex w-full justify-center gap-2">
        {imgs.map((_, idx) => {
            return (
            <button
                key={idx}
                onClick={() => setImgIndex(idx)}
                className={`h-3 w-3 rounded-full transition-colors ${
                idx === imgIndex ? "bg-neutral-50" : "bg-neutral-500"
                }`}
            />
            );
        })}
        </div>
    );
};

export default function Features () {
const [imgIndex, setImgIndex] = useState(0);

    const dragX = useMotionValue(0);

    const onDragEnd = () => {
        const x = dragX.get();

        if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
        setImgIndex((pv) => pv + 1);
        } else if (x >= DRAG_BUFFER && imgIndex > 0) {
        setImgIndex((pv) => pv - 1);
        }
    };

    return  (
        <div className='h-screen mt-10'>
            <h1 className=" text-4xl font-bold text-center">
                A productivity powerhouse
            </h1>
            <div className="w-full h-full flex justify-center sm:flex-col-reverse mt-5">
                <div className="lg:hidden md:hidden w-full h-[180px] overflow-hidden flex items-start justify-start gap-7">
                {
                    features.map((feature, index) => (
                    <motion.div
                    drag="x"
                    dragConstraints={{
                        left: 0,
                        right: 0,
                    }}
                    style={{
                        x: dragX,
                    }}
                    animate={{
                        translateX: `-${imgIndex * 100}%`,
                    }}
                    transition={SPRING_OPTIONS}
                    onDragEnd={onDragEnd}
                    className={ clsx ("w-[350px] h-[150px] rounded-md shrink-0 py-5 px-2 border border-r-4", index == imgIndex && 'dark:bg-gray-950 bg-slate-300 border-r-blue-600')}
                    onClick={() => setImgIndex(index)}>
                        <h1 className="text-xl dark:text-white text-gray-900 font-semibold">
                            {feature.name}
                        </h1>
                        <p>
                            {feature.description}
                        </p>
                    </motion.div>
                    ))
                }
                </div>
                <div className='sm:hidden h-auto w-[40%] flex flex-col gap-5'>
                    { 
                        features.map((feature, index) => (
                            <div className={ clsx ("w-[350px] h-[150px] rounded-md shrink-0 py-5 px-2 border border-r-4", index == imgIndex && 'dark:bg-gray-950 bg-slate-300  border-r-blue-600')}
                            onClick={() => setImgIndex(index)}>
                                <h1 className="text-xl dark:text-white text-gray-900 font-semibold">
                                    {feature.name}
                                </h1>
                                <p>
                                    {feature.description}
                                </p>
                            </div>
                        ))
                    }
                </div>
                <div className="relative overflow-hidden py-8 w-[60%] sm:w-full">
                    <motion.div
                        drag="x"
                        dragConstraints={{
                        left: 0,
                        right: 0,
                        }}
                        style={{
                        x: dragX,
                        }}
                        animate={{
                        translateX: `-${imgIndex * 100}%`,
                        }}
                        transition={SPRING_OPTIONS}
                        onDragEnd={onDragEnd}
                        className="flex cursor-grab items-center active:cursor-grabbing"
                    >
                        <Images imgIndex={imgIndex} />
                    </motion.div>

                    <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
                </div>
            </div>
        </div>
    )
}