import React from 'react'
import { BentoGrid, BentoGridItem } from './ui/BentoGrid'
import { gridItems } from '@/data'
import { cn } from "@/utils/cn";

const Grid = () => {
  return (
    <section id="about">
        <BentoGrid className="w-full pt-8 pb-20">
            {gridItems.map((item, i) => (
                <BentoGridItem
                    id={item.id}
                    key={item.id}
                    index={i}
                    title={item.title}
                    description={item.description}
                    className={item.className}
                    img={item.img}
                    imgClassName={item.imgClassName}
                    titleClassName={cn(
                      item.titleClassName,
                      item.id === 5 ? "text-left text-sm leading-relaxed" : ""
                    )}
                    spareImg={item.spareImg}
                />
            ))}
        </BentoGrid>
    </section>
  )
}

export default Grid
