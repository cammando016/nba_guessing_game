import React from "react";

function Background ({className, src, alt}) {

    return (
        <div className={`screen-${className}`}>
            <img
                className="border-image"
                src={src}
                alt={alt}
            />
        </div>
    )
}

export default Background