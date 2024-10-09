import { motion, useScroll, useTransform } from 'framer-motion';

function PAGE () {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <div className="h-screen overflow-y-scroll">
      <div className="h-[200vh] flex justify-center items-center">
        <motion.div
          style={{ opacity }}
          className="w-full h-full flex justify-center items-center"
        >
          <div className="w-[80%] h-[80%] bg-blue-500">
            <h1 className="text-white text-center">Scroll to see the effect</h1>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default PAGE;
