import React from 'react';
import { motion } from 'motion/react';

const HomeHeroText = () => {
  // Optimized animation variants for hero text
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  }

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
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

  const videoVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotate: -5
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.3
      }
    }
  }

  return (
    <motion.div 
      className="font-[font1] text-center relative depth-4 px-4 flex-1 flex items-center justify-center gpu-accelerated"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full">
        <motion.div 
          className="text-[12vw] sm:text-[9vw] lg:text-[9.5vw] justify-center flex items-center uppercase leading-[10vw] sm:leading-[7.5vw] lg:leading-[8vw] text-layer-3 mb-2 sm:mb-0 gpu-accelerated"
          variants={textVariants}
        >
          You do the work
        </motion.div>
        <motion.div 
          className="text-[12vw] sm:text-[9vw] lg:text-[9.5vw] justify-center flex items-center uppercase leading-[10vw] sm:leading-[7.5vw] lg:leading-[8vw] text-layer-3 flex-wrap justify-center mb-2 sm:mb-0"
          variants={textVariants}
        >
          <motion.span variants={textVariants}>we</motion.span>
          <motion.div 
            className="h-[8vw] w-[20vw] sm:h-[7vw] sm:w-[16vw] rounded-full overflow-hidden mx-2 sm:mx-2 glass glow-accent flex-shrink-0 my-1 sm:my-0 gpu-accelerated"
            variants={videoVariants}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
            }}
          >
            <video
              className="h-full w-full object-cover hero-inline-video gpu-accelerated"
              style={{
                objectFit: 'cover',
                objectPosition: 'center center',
                // Enhanced iOS Safari optimizations to prevent flickering
                WebkitTransform: 'translate3d(0,0,0)',
                transform: 'translate3d(0,0,0)',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
                // Critical: Prevent iOS Safari video flashing
                opacity: 1,
                visibility: 'visible',
                WebkitAppearance: 'none',
                // Force hardware acceleration consistently
                willChange: 'transform'
              }}
              // CRITICAL: iOS Safari attributes in optimal order for stability
              muted
              defaultMuted
              autoPlay
              playsInline
              loop
              preload="metadata"
              webkit-playsinline
              x-webkit-airplay="allow"
              // Enhanced iOS Safari stability attributes
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              onLoadedData={(e) => {
                // Enhanced iOS video handling with flicker prevention
                const video = e.target;
                
                // Immediate stability setup to prevent flashing
                video.style.opacity = '1';
                video.style.visibility = 'visible';
                
                // Ensure muted state for autoplay compliance
                video.muted = true;
                video.volume = 0;
                video.playsInline = true;
                
                // Force immediate render to prevent flash
                video.style.transform = 'translate3d(0,0,0)';
                
                const playPromise = video.play();
                if (playPromise !== undefined) {
                  playPromise.catch(error => {
                    console.warn('Inline video autoplay failed:', error.name);
                    // Enhanced fallback with stability preservation
                    setTimeout(() => {
                      video.style.opacity = '1';
                      video.load();
                      video.play().catch(e => console.warn('Inline video reload failed:', e));
                    }, 50);
                  });
                }
              }}
              onLoadedMetadata={(e) => {
                // Ensure video is immediately visible when metadata loads
                const video = e.target;
                video.style.opacity = '1';
                video.style.visibility = 'visible';
              }}
              onCanPlay={(e) => {
                // Final stability check when video can play
                const video = e.target;
                video.style.opacity = '1';
                video.style.visibility = 'visible';
              }}
              onError={(e) => {
                console.warn('Inline video error:', e.target.error);
                // Maintain visibility even on error to prevent flash
                e.target.style.opacity = '1';
              }}
            >
              {/* Multiple sources for cross-browser compatibility */}
              <source src="/video-720.mp4" type="video/mp4" media="(max-width: 767px)" />
              <source src="/video.webm" type="video/webm" />
              <source src="/video.mp4" type="video/mp4" />
            </video>
          </motion.div>
          <motion.span variants={textVariants}>do the</motion.span>
        </motion.div>
        <motion.div 
          className="text-[12vw] sm:text-[9vw] lg:text-[9.5vw] justify-center flex items-center uppercase leading-[10vw] sm:leading-[7.5vw] lg:leading-[8vw] text-layer-3 gpu-accelerated"
          variants={textVariants}
        >
          stitches
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomeHeroText;