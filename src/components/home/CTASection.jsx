import React, { useRef, useLayoutEffect, useMemo } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'motion/react'

const CTASection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, threshold: 0.3 })

  gsap.registerPlugin(ScrollTrigger)

  // Optimized animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }), [])

  const itemVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }), [])

  useGSAP(() => {
    // Cleanup any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === sectionRef.current) {
        trigger.kill()
      }
    })
  }, [])

  // Memoized stats data for performance
  const statsData = useMemo(() => [
    { value: '24h', label: 'Response Time' },
    { value: '100%', label: 'Satisfaction Rate' },
    { value: 'Free', label: 'Initial Consultation' }
  ], [])

  return (
    <motion.section
      id="cta"
      ref={sectionRef}
      className="min-h-screen section-dark-alt text-white relative depth-3 flex items-center section-transition gpu-accelerated"
      role="region"
      aria-labelledby="cta-heading"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="cinematic-overlay"></div>
      <div className="container mx-auto text-center w-full">
        <div className="max-width-wide">
          <motion.div 
            className="floating-panel-dark space-y-8 sm:space-y-10 lg:space-y-12 gpu-accelerated"
            variants={itemVariants}
          >
            <motion.h2 
              id="cta-heading"
              className="font-[font2] heading-responsive-xl uppercase mb-4 sm:mb-6 lg:mb-8 leading-tight text-layer-3 text-glow gpu-accelerated"
              variants={itemVariants}
            >
            Ready to Create Magic?
            </motion.h2>

            <motion.p 
              className="font-[font1] text-responsive leading-relaxed text-layer-2 max-width-text"
              variants={itemVariants}
            >
            Transformons votre jour spécial en un chef-d'œuvre cinématographique qui raconte votre histoire unique.
            </motion.p>

            <motion.div 
              className="flex-col-mobile justify-center"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1 }
                }}
              >
                <Link
                  to="/contact"
                  className="btn-pill btn-primary h-12 sm:h-16 lg:h-20 px-8 sm:px-12 lg:px-16 inline-flex items-center justify-center group focus:outline-none gpu-accelerated"
                  aria-label="Get started with our wedding videography services"
                >
                  <span className="font-[font2] text-base sm:text-xl lg:text-2xl">
                    Get Started Today
                  </span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1 }
                }}
              >
                <Link
                  to="/projects"
                  className="btn-pill btn-secondary h-12 sm:h-16 lg:h-20 px-8 sm:px-12 lg:px-16 inline-flex items-center justify-center group focus:outline-none gpu-accelerated"
                  aria-label="View our wedding videography portfolio"
                >
                  <span className="font-[font2] text-base sm:text-xl lg:text-2xl">
                    View Our Work
                  </span>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              className="responsive-grid-3 text-center"
              variants={containerVariants}
            >
              {statsData.map((stat, index) => (
                <motion.div 
                  key={stat.label} 
                  className="floating-panel-dark glass-hover space-y-3 sm:space-y-4 gpu-accelerated"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                  }}
                >
                  <motion.div 
                    className="text-2xl sm:text-3xl lg:text-4xl font-[font2] text-[#D3FD50] glow-accent text-layer-2 text-glow-strong"
                    variants={itemVariants}
                  >
                    {stat.value}
                  </motion.div>
                  <motion.div 
                    className="font-[font1] text-xs sm:text-sm lg:text-base text-layer-1 uppercase tracking-wide"
                    variants={itemVariants}
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default CTASection