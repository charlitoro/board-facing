import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router'
import {getResources} from "../../packages/api";
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
} from 'reactstrap';


export default function Board () {
    const router = useRouter()
    const { id } = router.query

    const [resources, setResources] = useState([])

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);


    useEffect(() => {
        getResources(id).then(data => {
            if (data) {
                const format = data.map( (resource) => ({
                    key: resource._id,
                    src: `${resource.path}`
                }))
                setResources(format)
            }
        })
    }, [])

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === resources.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? resources.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }


    const slides = resources.map((resource) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={resource.src}
            >
                <img className="d-block w-100" src={resource.src} alter="" />
            </CarouselItem>
        );
    });

    return (
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
        >
            <CarouselIndicators items={resources} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
    );
}
