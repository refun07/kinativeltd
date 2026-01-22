import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

export const TextReveal = ({ text, className = '', delay = 0 }: TextRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const words = text.split(' ');

    const container = {
        hidden: { opacity: 0 },
        visible: () => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: delay },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring' as const,
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
        },
    };

    return (
        <motion.div
            ref={ref}
            style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}
            variants={container}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={className}
        >
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    style={{ marginRight: '0.25em' }}
                    key={index}
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default TextReveal;
