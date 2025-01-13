import { companies, projects, testimonials } from '@/data'
import { div } from 'framer-motion/client'
import React from 'react'
import { PinContainer } from './ui/3d-pin'
import { FaLocationArrow } from 'react-icons/fa'
import { InfiniteMovingCards } from './ui/InfiniteMovingCards'

const Clients = () => {
  return (
    <div className="py-20" id="testimonials">
        <h1 className="heading">
            A small selection of {' '}
            <span className="text-purple"> Satisfied Clients</span>
        </h1>
        <div className="flex flex-col items-center mt-10">
                <InfiniteMovingCards 
                    items={testimonials}
                    direction="right"
                    speed="slow"
                />
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg: mt-10 ">
                    {companies.map(({id, img, name, nameImg}) => (
                        <div key={id} className="flex md:max-w-60 max-w-32 gap-2">
                            <img src={img} alt={name} className="md:w-10 w-5"/>
                            <img src={nameImg} alt={name} className="md:w-24 w-20"/>
                        </div>
                    ))}
                </div>
        </div>
    </div>
  )
}

export default Clients