import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Link } from 'react-router-dom';
import { GlowingEffect } from '../effects/GlowingEffect';

const WhyUsSection = () => {
  const sectionRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    // Animate section title
    gsap.fromTo(
      '.why-us-title',
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.why-us-title',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Animate intro text
    gsap.fromTo(
      '.intro-text',
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: '.intro-text',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Animate benefit cards with stagger
    gsap.fromTo(
      '.benefit-card',
      {
        opacity: 0,
        y: 40,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: {
          amount: 0.4,
        },
        scrollTrigger: {
          trigger: '.benefits-grid',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  const benefits = [
    {
      icon: '⚡',
      title: 'Creative Spark',
      description:
        'We ignite the creative process with innovative thinking that transforms brands into memorable experiences.',
    },
    {
      icon: '🎯',
      title: 'Strategic Focus',
      description:
        'Every decision is made with long-term brand building in mind, ensuring sustainable growth and influence.',
    },
    {
      icon: '🔥',
      title: 'Authentic Friction',
      description:
        'We create the right tension that generates emotion and builds genuine connections with your audience.',
    },
    {
      icon: '💎',
      title: 'Unfiltered Honesty',
      description:
        'We tell you what needs to be said and do what needs to be done, ensuring transparent partnerships.',
    },
  ];

  return (
    <section
      id="why-us"
      className="min-h-screen section-dark text-white relative depth-3 section-transition"
    >
      <div className="cinematic-overlay"></div>
      <div className="container mx-auto section-padding">
        {/* Section Header */}
        <div className="text-center component-margin space-y-4 sm:space-y-6 lg:space-y-8">
          <h2 className="why-us-title font-[font2] heading-responsive-xl uppercase mb-4 sm:mb-6 lg:mb-8 leading-tight text-layer-3 text-glow">
          Get to Know the Amoura Promise
          </h2>
          <div className="floating-panel-dark max-width-content">
            <p className="intro-text font-[font1] text-responsive leading-relaxed text-layer-2">
            Creative • Reliable • Timely
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="benefits-grid responsive-grid-2 max-width-wide relative rounded-2xl">
          <GlowingEffect 
            disabled={false}
            proximity={100}
            spread={30}
            blur={2}
            movementDuration={1.5}
            borderWidth={2}
            glow={true}
          />
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="benefit-card group floating-panel-dark glass-hover glass-click gpu-accelerated relative"
            >
              {/* Icon */}
              <div className="text-5xl sm:text-6xl lg:text-7xl mb-6 sm:mb-8 micro-bounce glow-accent">
                {benefit.icon}
              </div>

              {/* Content */}
              <div className="space-y-4 sm:space-y-6">
                <h3 className="font-[font2] heading-responsive-md uppercase text-layer-2">
                  {benefit.title}
                </h3>
                <p className="font-[font1] text-responsive leading-relaxed text-layer-1">
                  {benefit.description}
                </p>
              </div>

              {/* Hover accent line */}
              <div className="w-full accent-line mt-6 sm:mt-8 rounded-full glow-accent"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
