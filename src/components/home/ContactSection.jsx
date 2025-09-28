import React, { useRef } from 'react';
import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { motion, useInView } from 'motion/react';

const ContactSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  gsap.registerPlugin(ScrollTrigger);

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
      y: 30,
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
      if (trigger.trigger === sectionRef.current) {
        trigger.kill()
      }
    })
  }, []);

  const socialLinks = [
    { name: 'Instagram', url: 'https://instagram.com/s111khar', icon: '📷' },
    { name: 'Facebook', url: 'https://facebook.com/amouraworks', icon: '📘' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/amouraworks', icon: '💼' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('https://formspree.io/f/mandlzyw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.section
      id="contact"
      ref={sectionRef}
      className="min-h-screen section-dark text-white relative depth-3 section-transition gpu-accelerated"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="cinematic-overlay"></div>
      <div className="container mx-auto section-padding">
        <div className="text-center component-margin space-y-4 sm:space-y-6 lg:space-y-8">
          <motion.h2 
            className="font-[font2] heading-responsive-xl uppercase mb-4 sm:mb-6 lg:mb-8 leading-tight text-layer-3 text-glow gpu-accelerated"
            variants={itemVariants}
          >
            Get In Touch
          </motion.h2>
          <motion.div 
            className="floating-panel-dark max-width-content gpu-accelerated"
            variants={itemVariants}
          >
            <motion.p 
              className="font-[font1] text-responsive leading-relaxed text-layer-2"
              variants={itemVariants}
            >
            The first step to your perfect film is a simple hello. Reach out to us today :)
            </motion.p>
          </motion.div>
        </div>

        <div className="contact-grid responsive-grid-2 max-width-wide">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            <motion.div 
              className="floating-panel-dark space-y-4 sm:space-y-6 gpu-accelerated"
              variants={itemVariants}
              whileHover={{ 
                y: -3,
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
              }}
            >
              <motion.h3 
                className="font-[font2] heading-responsive-md uppercase text-[#D3FD50] text-layer-2 text-glow"
                variants={itemVariants}
              >
                Contact Details
              </motion.h3>
              <div className="space-y-3 sm:space-y-4 font-[font1] text-responsive text-layer-1">
                <motion.p 
                  className="flex items-start sm:items-center space-x-3 sm:space-x-4"
                  variants={itemVariants}
                >
                  <span className="micro-bounce glow-accent">📧</span>
                  <span className="break-all sm:break-normal">contact@amouraworks.com</span>
                </motion.p>
                <motion.p 
                  className="flex items-start sm:items-center space-x-3 sm:space-x-4"
                  variants={itemVariants}
                >
                  <span className="micro-bounce glow-accent">📍</span>
                  <span>22 ruelle du Clerc, 59126, Linselles (France)</span>
                </motion.p>
                <motion.p 
                  className="flex items-start sm:items-center space-x-3 sm:space-x-4"
                  variants={itemVariants}
                >
                  <span className="micro-bounce glow-accent">🕒</span>
                  <span>M–F: 9am – 7pm (UTC+1)</span>
                </motion.p>
              </div>
            </motion.div>

            <motion.div 
              className="floating-panel-dark space-y-4 sm:space-y-6 gpu-accelerated"
              variants={itemVariants}
              whileHover={{ 
                y: -3,
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
              }}
            >
              <motion.h3 
                className="font-[font2] heading-responsive-md uppercase text-[#D3FD50] text-layer-2 text-glow"
                variants={itemVariants}
              >
                Follow Us
              </motion.h3>
              <div className="flex justify-center sm:justify-start space-x-4 sm:space-x-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 glass glass-hover glass-click rounded-full flex items-center justify-center group glow-accent gpu-accelerated"
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      transition: { duration: 0.1 }
                    }}
                  >
                    <span className="text-lg sm:text-xl lg:text-2xl micro-bounce glow-accent">
                      {social.icon}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="floating-panel-dark gpu-accelerated"
              variants={itemVariants}
              whileHover={{ 
                y: -3,
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
              }}
            >
              <motion.h4 
                className="font-[font2] text-lg sm:text-xl lg:text-2xl uppercase text-[#D3FD50] mb-4 sm:mb-6 text-layer-2 text-glow"
                variants={itemVariants}
              >
                  Quick Response Guarantee
              </motion.h4>
              <motion.p 
                className="font-[font1] text-responsive text-layer-1 leading-relaxed"
                variants={itemVariants}
              >
                  We respond to all inquiries within 24 hours. Your project deserves our immediate attention.
              </motion.p>
            </motion.div>
          </div>

          {/* Quick Contact Form */}
          <motion.div 
            className="floating-panel-dark gpu-accelerated"
            variants={itemVariants}
          >
            <motion.h3 
              className="font-[font2] heading-responsive-md uppercase text-[#D3FD50] mb-6 sm:mb-8 lg:mb-10 text-layer-2 text-glow"
              variants={itemVariants}
            >
                Quick Inquiry
            </motion.h3>

            {submitStatus === 'success' && (
              <motion.div 
                className='success-state mb-6 sm:mb-8'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className='font-[font2] text-base sm:text-lg'>
                  Thank you for your inquiry! We will get back to you within 24 hours.
                </p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div 
                className='error-state mb-6 sm:mb-8'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className='font-[font2] text-base sm:text-lg'>
                  Sorry, there was an error sending your message. Please try again or contact us directly.
                </p>
              </motion.div>
            )}

            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-6 sm:space-y-8"
              variants={containerVariants}
            >
              <div className="form-grid form-grid-2 gap-4 sm:gap-6">
                  <motion.input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full input-inset text-white placeholder-gray-400 smooth-transition-fast"
                    variants={itemVariants}
                    whileFocus={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  />
                  <motion.input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full input-inset text-white placeholder-gray-400 smooth-transition-fast"
                    variants={itemVariants}
                    whileFocus={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  />
              </div>

                <motion.input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full input-inset text-white placeholder-gray-400 smooth-transition-fast"
                  variants={itemVariants}
                  whileFocus={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                />

                <motion.textarea
                  name="message"
                  placeholder="Tell us about your wedding vision..."
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full input-inset text-white placeholder-gray-400 resize-none smooth-transition-fast"
                  variants={itemVariants}
                  whileFocus={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                />

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-pill btn-primary h-12 sm:h-14 font-[font2] text-base sm:text-lg lg:text-xl disabled:opacity-50 disabled:cursor-not-allowed gpu-accelerated"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
