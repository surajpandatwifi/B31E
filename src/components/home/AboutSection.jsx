import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { motion, useInView } from 'motion/react'

const AboutSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 })
  
  gsap.registerPlugin(ScrollTrigger)

  // Optimized animation variants
  const containerVariants = {
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
  }

  const itemVariants = {
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
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  useGSAP(() => {
    // Cleanup any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === sectionRef.current) {
        trigger.kill()
      }
    })
  })

  return (
    <motion.section 
      id="about" 
      ref={sectionRef} 
      className='min-h-screen section-dark-alt text-white relative depth-3 section-transition gpu-accelerated'
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="cinematic-overlay"></div>
      <div className='container mx-auto section-padding'>
        <div className='text-center component-margin space-y-4 sm:space-y-6 lg:space-y-8'>
          <motion.h2 
            className='font-[font2] heading-responsive-xl uppercase mb-4 sm:mb-6 lg:mb-8 leading-tight text-layer-3 text-glow gpu-accelerated'
            variants={itemVariants}
          >
            About Us
          </motion.h2>
        </div>

        <div className='about-grid max-width-wide'>
          <motion.div 
            className='floating-panel-dark mb-12 sm:mb-16 gpu-accelerated'
            variants={itemVariants}
          >
            <div className='responsive-grid-2 items-center'>
            {/* Story Content */}
              <motion.div 
                className='space-y-6 sm:space-y-8 order-2 lg:order-1 gpu-accelerated'
                variants={itemVariants}
              >
                <motion.h3 
                  className='font-[font2] heading-responsive-lg uppercase text-[#D3FD50] mb-4 sm:mb-6 text-layer-2 text-glow'
                  variants={itemVariants}
                >
                Our Story
                </motion.h3>
                <motion.p 
                  className='font-[font1] text-responsive leading-relaxed text-layer-1'
                  variants={itemVariants}
                >
                For 7 years, we’ve dedicated ourselves to transforming weddings into cinematic stories. With equal parts craft and heart, we create films that feel as real as the moments themselve, memories designed to last a lifetime.
                </motion.p>
                <motion.div 
                  className='floating-quote'
                  variants={itemVariants}
                >
                  <motion.p 
                    className='font-[font1] text-responsive leading-relaxed text-layer-2 italic'
                    variants={itemVariants}
                  >
              "Our approach is simple,  to be present, to listen, and to see your day as you live it. With equal parts skill and sensitivity, we create films that feel real, timeless, and true to you."
                  </motion.p>
                </motion.div>
              </motion.div>

              {/* Image Placeholder */}
              <motion.div 
                className='order-1 lg:order-2 gpu-accelerated'
                variants={itemVariants}
              >
                <motion.div 
                  className='aspect-square rounded-2xl sm:rounded-3xl overflow-hidden video-glass gpu-accelerated'
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                  }}
                >
                  <img 
                    src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop"
                    alt="Our Team in Action"
                    className='w-full h-full object-cover transition-transform duration-700 lazy-image'
                    loading="lazy"
                    onLoad={(e) => e.target.classList.add('loaded')}
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Values Grid */}
          <div className='responsive-grid-3'>
            {[
              { icon: '🎯', title: 'Vision', text: 'We want every wedding film to feel like a piece of your story.  real, timeless, and full of love.' },
              { icon: '💎', title: 'Mission', text: 'Our goal is simple: to give you memories that feel alive, not staged. Films that make you feel the day all over again.' },
              { icon: '⚡', title: 'Values', text: 'We stay true to what\'s real. We create with heart and imagination. And we give our very best, every single time.' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className='text-center space-y-4 gpu-accelerated'
                variants={itemVariants}
              >
                <motion.div 
                  className='floating-panel-dark glass-hover space-y-4 sm:space-y-6 gpu-accelerated'
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                  }}
                >
                <div className='text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4 micro-bounce glow-accent'>🎯</div>
                <h4 className='font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-layer-2'>{item.title}</h4>
                <p className='font-[font1] text-responsive leading-relaxed text-layer-1'>{item.text}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default AboutSection
                </h4>
                <p className='font-[font1] text-responsive leading-relaxed text-layer-1'>
              We want every wedding film to feel like a piece of your story.  real, timeless, and full of love.
                </p>
              </div>
            </div>

            <div className='about-content text-center space-y-4'>
              <div className='floating-panel-dark glass-hover space-y-4 sm:space-y-6'>
                <div className='text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4 micro-bounce glow-accent'>💎</div>
                <h4 className='font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-layer-2'>
                Mission
                </h4>
                <p className='font-[font1] text-responsive leading-relaxed text-layer-1'>
              Our goal is simple: to give you memories that feel alive, not staged. Films that make you feel the day all over again.
                </p>
              </div>
            </div>

            <div className='about-content text-center space-y-4'>
              <div className='floating-panel-dark glass-hover space-y-4 sm:space-y-6'>
                <div className='text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4 micro-bounce glow-accent'>⚡</div>
                <h4 className='font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-layer-2'>
                Values
                </h4>
                <p className='font-[font1] text-responsive leading-relaxed text-layer-1'>
              We stay true to what’s real. We create with heart and imagination. And we give our very best, every single time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection