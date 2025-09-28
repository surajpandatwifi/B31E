import React, { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'motion/react'

// Video data - using existing portfolio videos
const teasers = [
  { videoId: 'QGsa5QB5gK4' },
  { videoId: '5fR4MErzYeI' },
  { videoId: '2qFnRXpSFn8' },
  { videoId: '7bZ5MKY6pfU' },
  { videoId: 'QstSPHan4oE' },
  { videoId: 'HMJyD-kPWek' },
  { videoId: 'zd5De3LAMQc' },
  { videoId: 'YM1TZnbcbOs' },
  { videoId: 'pRya97qUJMs' },
  { videoId: 'AqqGxOrwv_g' }
]

const highlights = [
  { videoId: '2qFnRXpSFn8' },
  { videoId: 'dRjCKw7YonM' },
  { videoId: 'L9PMwOelcRk' },
  { videoId: 'qeMFqkcPYcg' },
  { videoId: 'SQoA_wjmE9w' },
  { videoId: 'ZbZSe6N_BXs' },
  { videoId: 'HEXWRTEbj1I' },
  { videoId: 'U9t-slLl69E' },
  { videoId: 'iik25wqIuFo' },
  { videoId: 'C0DPdy98e4c' }
]

// Minimal Video Card Component with cinematic styling
const VideoCard = ({ video, index, isVisible, isMobile, variants }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false)
  const cardRef = useRef(null)

  // Generate thumbnail URL from YouTube video ID
  const thumbnailUrl = `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`

  const handleCardClick = () => {
    if (isMobile) {
      // On mobile, open YouTube video in new tab
      window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank')
    }
  }

  return (
    <motion.div 
      ref={cardRef}
      className="group relative aspect-video video-glass gpu-accelerated cursor-pointer overflow-hidden"
      variants={variants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      whileHover={{ 
        y: -5,
        scale: 1.02,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
    >
      {/* Loading shimmer effect */}
      {!thumbnailLoaded && (
        <div className="absolute inset-0 loading-shimmer bg-gray-800/50" />
      )}

      {/* Thumbnail Image with blur-to-sharp transition */}
      <img
        src={thumbnailUrl}
        alt={`Portfolio video ${index + 1}`}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
          isHovered && isLoaded && !isMobile ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        } ${!thumbnailLoaded ? 'blur-sm' : 'blur-0'}`}
        loading="lazy"
        onLoad={() => setThumbnailLoaded(true)}
      />

      {/* Low-res blurred fallback */}
      <img
        src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover blur-md scale-110 transition-opacity duration-300 ${
          thumbnailLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        loading="lazy"
      />

      {/* YouTube Video (shown on hover for desktop only) */}
      {isVisible && !isMobile && (
        <iframe
          className={`absolute inset-0 w-full h-full transition-all duration-700 ${
            isHovered && thumbnailLoaded ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
          src={`https://www.youtube.com/embed/${video.videoId}?autoplay=${isHovered ? 1 : 0}&mute=1&loop=1&playlist=${video.videoId}&controls=1&modestbranding=1&rel=0&showinfo=0`}
          title={`Portfolio video ${index + 1}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />
      )}

      {/* Cinematic overlay gradients */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 transition-all duration-500 ${
        isHovered && !isMobile ? 'opacity-60' : 'opacity-80'
      }`} />

      {/* Custom Play Button */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
        isHovered && !isMobile ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
      }`}>
        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 glass rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 glow-accent">
          <div className="w-0 h-0 border-l-[12px] sm:border-l-[16px] lg:border-l-[20px] border-l-white border-y-[8px] sm:border-y-[12px] lg:border-y-[14px] border-y-transparent ml-1 sm:ml-2"></div>
        </div>
      </div>

      {/* Cinematic glow effect on hover */}
      <div className={`absolute inset-0 rounded-lg sm:rounded-xl transition-all duration-500 ${
        isHovered && !isMobile ? 'shadow-2xl shadow-[#D3FD50]/20 scale-105' : 'scale-100'
      }`} />
    </motion.div>
  )
}

// 2-Row Grid Component
const TwoRowGrid = ({ videos, isVisible, isMobile, containerVariants, itemVariants }) => {
  // Calculate videos per row based on screen size
  const getVideosPerRow = () => {
    if (typeof window === 'undefined') return 3 // SSR fallback
    if (window.innerWidth < 768) return 1 // Mobile: 1 per row
    if (window.innerWidth < 1024) return 2 // Tablet: 2 per row  
    return 3 // Desktop: 3 per row
  }

  const [videosPerRow, setVideosPerRow] = useState(getVideosPerRow)

  useEffect(() => {
    const handleResize = () => {
      setVideosPerRow(getVideosPerRow())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Get exactly 2 rows worth of videos
  const totalVideos = videosPerRow * 2
  const displayVideos = videos.slice(0, totalVideos)

  return (
    <motion.div 
      className="two-row-container relative mb-0 gpu-accelerated"
      variants={containerVariants}
    >
      {/* Top Fade Gradient */}
      <div className="absolute -top-4 left-0 right-0 h-8 sm:h-12 lg:h-16 bg-gradient-to-b from-black/60 via-black/30 to-transparent pointer-events-none z-10" />
      
      {/* Bottom Fade Gradient */}
      <div className="absolute -bottom-4 left-0 right-0 h-8 sm:h-12 lg:h-16 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none z-10" />

      {/* 2-Row Grid */}
      <motion.div 
        className={`grid gap-4 sm:gap-6 lg:gap-8 ${
        videosPerRow === 1 ? 'grid-cols-1' : 
        videosPerRow === 2 ? 'grid-cols-2' : 
        'grid-cols-3'
        } grid-rows-2`}
        variants={containerVariants}
      >
        {displayVideos.map((video, index) => (
          <VideoCard 
            key={`${video.videoId}-${index}`}
            video={video}
            index={index}
            isVisible={isVisible}
            isMobile={isMobile}
            variants={itemVariants}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

const PortfolioSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 })
  const [isMobile, setIsMobile] = useState(false)
  
  // Combine videos for 2-row display
  const allVideos = [...teasers.slice(0, 5), ...highlights.slice(0, 7)] // 12 videos max (enough for 3x2 desktop grid)

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
  }

  // Detect mobile for interaction handling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    // Cleanup any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === sectionRef.current) {
        trigger.kill()
      }
    })
  }, [])

  return (
    <motion.section
      id="portfolio"
      ref={sectionRef}
      className="min-h-screen section-dark-alt text-white relative depth-3 section-transition gpu-accelerated"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="cinematic-overlay"></div>
      <div className="container mx-auto section-padding">
        {/* Section Header */}
        <div className="text-center component-margin space-y-4 sm:space-y-6 lg:space-y-8">
          <motion.h2 
            className="font-[font2] heading-responsive-xl uppercase mb-4 sm:mb-6 lg:mb-8 leading-tight text-layer-3 text-glow gpu-accelerated"
            variants={itemVariants}
          >
            Our Portfolio
          </motion.h2>
          <motion.div 
            className="floating-panel-dark max-width-content gpu-accelerated"
            variants={itemVariants}
          >
            <motion.p 
              className="font-[font1] text-responsive leading-relaxed text-layer-2"
              variants={itemVariants}
            >
              gujar jati veeron ki
            </motion.p>
          </motion.div>
        </div>

        {/* 2-Row Video Grid */}
        <motion.div 
          className="portfolio-showcase component-margin max-width-content"
          variants={itemVariants}
        >
          <TwoRowGrid 
            videos={allVideos} 
            isVisible={isInView} 
            isMobile={isMobile}
            containerVariants={containerVariants}
            itemVariants={itemVariants}
          />
        </motion.div>

        {/* Portfolio Button */}
        <motion.div 
          className="text-center component-margin"
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
              to="/projects"
              className="btn-pill btn-primary h-12 sm:h-16 lg:h-20 px-8 sm:px-12 lg:px-16 inline-flex items-center justify-center group gpu-accelerated"
            >
              <span className="font-[font2] text-base sm:text-xl lg:text-2xl">
                View Our Portfolio
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default PortfolioSection
