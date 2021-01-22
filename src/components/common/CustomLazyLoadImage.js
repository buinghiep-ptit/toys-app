import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx"; // a utility for constructing className conditionally
import 'assets/css/lazyLoadingImage.css';

export function LazyImage({ className, src, alt, lqip, aspectRatio = 2 / 3 }) {
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef();
    useEffect(() => {
        if (imgRef.current && imgRef.current.complete) {
            setLoaded(true);
        }
    }, []);
    return (
        <div className={clsx("wrapper", className)}>
            <div style={{ paddingBottom: `${100 / aspectRatio}%` }} />
            {lqip && <img src={lqip} alt="" aria-hidden="true" />}
            <img
                loading="lazy"
                src={src}
                alt={alt}
                ref={imgRef}
                onLoad={() => setLoaded(true)}
                className={clsx("source", loaded && "loaded")}
            />
        </div>
    );
};