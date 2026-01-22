import { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxProps {
    children: ReactNode;
    offset?: number;
}

export const ParallaxSection = ({ children, offset = 50 }: ParallaxProps) => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, offset]);

    return (
        <motion.div style={{ y }}>
            {children}
        </motion.div>
    );
};

export default ParallaxSection;
