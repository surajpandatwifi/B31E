import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'motion/react'

const Footer = () => {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, threshold: 0.1 })
  
  gsap.registerPlugin(ScrollTrigger)

  // Optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.98
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
  }

  useGSAP(() => {
    // Cleanup any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === footerRef.current) {
        trigger.kill()
      }
    })
  })

  const quickLinks = [
    { name: 'Contact', href: '#contact' },
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms & Conditions', href: '#terms' },
    { name: 'Affiliates', href: '#affiliates' }
  ]

  return (
    <motion.footer 
      ref={footerRef} 
      className='section-dark text-white relative depth-3 gpu-accelerated'
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="cinematic-overlay"></div>
      <div className='container mx-auto section-padding'>
        {/* Main CTA Section */}
        <motion.div 
          className='text-center component-margin'
          variants={itemVariants}
        >
          <motion.div 
            className='floating-panel-dark space-y-6 sm:space-y-8 gpu-accelerated'
            variants={itemVariants}
          >
            <motion.h2 
              className='font-[font2] text-4xl sm:text-5xl lg:text-[6vw] uppercase mb-4 sm:mb-6 lg:mb-8 leading-tight text-layer-3 text-glow gpu-accelerated'
              variants={itemVariants}
            >
            Let's Talk About Your Project
            </motion.h2>
            <motion.div 
              className='flex justify-center'
              variants={itemVariants}
            >
              <motion.button 
                className='btn-pill btn-primary h-12 sm:h-14 lg:h-16 px-6 sm:px-8 lg:px-12 group gpu-accelerated'
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                }}
                whileTap={{ 
                  scale: 0.95,
                  transition: { duration: 0.1 }
                }}
              >
                <span className='font-[font2] text-base sm:text-lg lg:text-xl'>
                  Inquire Now
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Footer Information Grid */}
        <motion.div 
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 mb-12 sm:mb-16'
          variants={containerVariants}
        >
          {/* Quick Links */}
          <motion.div 
            className='floating-panel-dark space-y-4 sm:space-y-6 gpu-accelerated'
            variants={itemVariants}
            whileHover={{ 
              y: -3,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
            }}
          >
            <motion.h3 
              className='font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-[#D3FD50] mb-4 sm:mb-6 text-layer-2'
              variants={itemVariants}
            >
              Quick Links
            </motion.h3>
            <ul className='space-y-3 sm:space-y-4'>
              <motion.li variants={itemVariants}>
                <motion.button 
                  onClick={() => {
                    const element = document.getElementById('portfolio')
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }}
                  className='font-[font1] text-sm sm:text-base lg:text-lg text-layer-1 interactive-hover text-left micro-bounce w-full text-left smooth-transition-fast'
                  whileHover={{ 
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  Our Portfolio
                </motion.button>
              </motion.li>
              <motion.li variants={itemVariants}>
                <motion.div
                  whileHover={{ 
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Link 
                  to="/contact"
                  className='font-[font1] text-sm sm:text-base lg:text-lg text-layer-1 interactive-hover micro-bounce block smooth-transition-fast'
                  >
                    Contact
                  </Link>
                </motion.div>
              </motion.li>
              <motion.li variants={itemVariants}>
                <motion.div
                  whileHover={{ 
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Link 
                  to="/privacy-policy"
                  className='font-[font1] text-sm sm:text-base lg:text-lg text-layer-1 interactive-hover micro-bounce block smooth-transition-fast'
                  >
                    Privacy Policy
                  </Link>
                </motion.div>
              </motion.li>
              <motion.li variants={itemVariants}>
                <motion.div
                  whileHover={{ 
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Link 
                  to="/terms-of-service"
                  className='font-[font1] text-sm sm:text-base lg:text-lg text-layer-1 interactive-hover micro-bounce block smooth-transition-fast'
                  >
                    Terms & Conditions
                  </Link>
                </motion.div>
              </motion.li>
              <motion.li variants={itemVariants}>
                <motion.div
                  whileHover={{ 
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Link 
                  to="/affiliate-program"
                  className='font-[font1] text-sm sm:text-base lg:text-lg text-layer-1 interactive-hover micro-bounce block smooth-transition-fast'
                  >
                    Affiliate Program
                  </Link>
                </motion.div>
              </motion.li>
            </ul>
          </motion.div>

          {/* Company Address */}
          <motion.div 
            className='floating-panel-dark space-y-4 sm:space-y-6 gpu-accelerated'
            variants={itemVariants}
            whileHover={{ 
              y: -3,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
            }}
          >
            <motion.h3 
              className='font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-[#D3FD50] mb-4 sm:mb-6 text-layer-2 text-glow'
              variants={itemVariants}
            >
              Address
            </motion.h3>
            <motion.div 
              className='font-[font1] text-sm sm:text-base lg:text-lg text-layer-1 leading-relaxed space-y-1 sm:space-y-2'
              variants={itemVariants}
            >
              <motion.p variants={itemVariants}>22 ruelle du Clerc</motion.p>
              <motion.p variants={itemVariants}>59126, Linselles</motion.p>
              <motion.p variants={itemVariants}>(France)</motion.p>
            </motion.div>
          </motion.div>

          {/* Hours of Operation */}
          <motion.div 
            className='floating-panel-dark space-y-4 sm:space-y-6 gpu-accelerated'
            variants={itemVariants}
            whileHover={{ 
              y: -3,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
            }}
          >
            <motion.h3 
              className='font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-[#D3FD50] mb-4 sm:mb-6 text-layer-2 text-glow'
              variants={itemVariants}
            >
              Hours
            </motion.h3>
            <motion.div 
              className='font-[font1] text-sm sm:text-base lg:text-lg text-layer-1 space-y-2 sm:space-y-3'
              variants={itemVariants}
            >
              <motion.p variants={itemVariants}>M–F: 9am – 7pm (UTC+1)</motion.p>
              <motion.p variants={itemVariants}>Saturday & Sunday: Closed</motion.p>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className='floating-panel-dark space-y-4 sm:space-y-6 gpu-accelerated'
            variants={itemVariants}
            whileHover={{ 
              y: -3,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
            }}
          >
            <motion.h3 
              className='font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-[#D3FD50] mb-4 sm:mb-6 text-layer-2 text-glow'
              variants={itemVariants}
            >
              Contact
            </motion.h3>
            <motion.div 
              className='font-[font1] text-sm sm:text-base lg:text-lg text-layer-1'
              variants={itemVariants}
            >
              <motion.a 
                href="mailto:contact@amouraworks.com"
                target="_blank"
                rel="noopener noreferrer"
                className='interactive-hover micro-bounce break-all sm:break-normal smooth-transition-fast'
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                contact@amouraworks.com
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Border Line */}
        <motion.div 
          className='floating-panel-dark text-center gpu-accelerated'
          variants={itemVariants}
        >
          <motion.div 
            className='text-center'
            variants={itemVariants}
          >
            <motion.p 
              className='font-[font1] text-xs sm:text-sm lg:text-base text-layer-1'
              variants={itemVariants}
            >
              ©️ 2025 Amoura Works. All rights reserved.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer
