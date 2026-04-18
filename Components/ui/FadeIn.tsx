'use client';

import { motion, type Variants } from 'framer-motion';
import React, { useMemo } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  once?: boolean;
  /** Pass a string to use as motion.as — default is 'div' */
  as?: React.ElementType;
}

const dirMap: Record<Direction, object> = {
  up:    { y: 28 },
  down:  { y: -28 },
  left:  { x: 28 },
  right: { x: -28 },
  none:  {},
};

/**
 * FadeIn — wraps children in a Framer Motion element that fades + slides
 * in when the element scrolls into view.
 *
 * Usage:
 *   <FadeIn delay={0.2} direction="up">
 *     <SomeContent />
 *   </FadeIn>
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.55,
  direction = 'up',
  distance,
  once = true,
  as: Tag = 'div',
}: FadeInProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const MotionTag = useMemo(() => motion.create(Tag as any), [Tag]);

  const hidden: Variants['hidden'] = {
    opacity: 0,
    ...dirMap[direction],
    ...(distance !== undefined ? (
      direction === 'up'    ? { y: distance }  :
      direction === 'down'  ? { y: -distance } :
      direction === 'left'  ? { x: distance }  :
      direction === 'right' ? { x: -distance } : {}
    ) : {}),
  };

  return (
    <MotionTag
      initial={hidden}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/**
 * FadeInStagger — wraps a list of children and staggers their entrance.
 * Each direct child should be wrapped in <FadeInStagger.Item>.
 *
 * Usage:
 *   <FadeInStagger stagger={0.1}>
 *     {items.map((item, i) => (
 *       <FadeInStagger.Item key={i}>...</FadeInStagger.Item>
 *     ))}
 *   </FadeInStagger>
 */
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show:   {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

function FadeInStagger({
  children,
  className,
  stagger = 0.1,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      variants={{ ...containerVariants, show: { transition: { staggerChildren: stagger } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

FadeInStagger.Item = StaggerItem;

export { FadeInStagger };
