import React, { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface CounterProps {
    value: string;
    duration?: number;
}

const Counter: React.FC<CounterProps> = ({ value, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        const target = parseInt(value.replace(/[^0-9]/g, ''));

        if (isNaN(target)) {
            setCount(0);
            return;
        }

        const totalFrames = Math.round(duration / 16);
        const increment = target / totalFrames;
        let frame = 0;

        const timer = setInterval(() => {
            frame++;
            const current = Math.min(Math.floor(increment * frame), target);
            setCount(current);

            if (frame >= totalFrames) {
                clearInterval(timer);
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isInView, value, duration]);

    return (
        <span ref={ref}>
            {count}{value.replace(/[0-9]/g, '')}
        </span>
    );
};

export default Counter;
