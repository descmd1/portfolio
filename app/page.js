
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import 'remixicon/fonts/remixicon.css';

const projects = [
  {
    title: 'E-commerce app',
    description: 'An e-commerce site built with MERN stack and Stripe.',
    link: 'https://mern-ecommerce-chi-three.vercel.app',
  },
  {
    title: 'Learning Management System',
    description: 'A full-stack LMS built with Next.js and MongoDB.',
    link: 'https://lms-xfl6.vercel.app',
  },
 {
    title: 'Chat app',
    description: 'Real-time chat application with Socket.IO.',
    link: 'https://chat-app-liart-kappa.vercel.app',
  },
  {
    title: 'Portfolio site',
    description: 'Portfolio site with modern animations and design.',
    link: 'https://portfolio-nu-gold-62.vercel.app',
  },
  
   {
    title: 'Todo app',
    description: 'A todo platform using MYSQL and React.',
    link: 'https://my-task-manager-lyart.vercel.app/',
  },
];

const skills = [
   'HTML5', 'CSS3', 'Tailwind CSS','JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'MongoDB',  'MYSQL', 'Postgresql', 'Graphql', 'Express', 'Tailwind CSS', 'Sass','Mateiral UI', 'Framer Motion', 'Git', 'Jira', 'Azure',
];

const experiences = [
  {
    company: 'MTN Nigeria',
    role: 'Frontend Developer',
    duration: 'Sept 2024 - Present',
    responsibilities: [
      'Modernized legacy systems with React.',
      'Worked on internal tools for telecom operations.',
    ],
    projects: [
      'https://play.mtn.ng'
    ]
  },
  {
    company: 'Kominiti',
    role: 'Frontend Developer',
    duration: 'July 2023 - August 2024',
    responsibilities: [
      'Developed real-time dashboards and client portals.',
      'Maintained codebase and implemented automated tests.',
    ],
    projects: [
      'https://kominiti.com'
    ]
  },
  {
    company: 'Utainfinity Global',
    role: 'Frontend Developer',
    duration: 'Oct 2022 - Dec 2023',
    responsibilities: [
      'Implemented responsive UIs with React and Tailwind CSS.',
      'Optimized frontend performance and SEO.',
    ],
    projects: [
      'https://ultainfinity.com'
    ]
  },
  {
    company: 'Carifika Global',
    role: 'Frontend Developer',
    duration: 'Jul 2021 - Sep 2022',
    responsibilities: [
      'Created component libraries and built scalable UI components.',
      'Collaborated with backend teams for API integration.',
    ],
    projects: [
      'https://www.carifika.org'
    ]
  },
  
  {
    company: 'Ivy Arc',
    role: 'Full Stack Developer',
    duration: 'Nov 2020 - August 2022',
    responsibilities: [
      'Built scalable backend services using Node.js and MongoDB.',
      'Integrated payment systems and developed RESTful APIs.',
    ],
    projects: [
      'https://edge.ivyarc.com'
    ]
  },
  {
    company: 'Servixpress',
    role: 'Full Stack Developer',
    duration: 'Jan 2025 - Present',
    responsibilities: [
      'Led development of end-to-end delivery systems.',
      'Managed deployment pipelines and CI/CD.',
    ],
    projects: [
      'https://servicexpress-tau.vercel.app'
    ]
  },
];

const list = [
  'Home', 'Projects', 'Skills', 'Work Experience', 'Contact'
]
export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mounted) return;
    
    // Manual scroll detection for better control
    const handleScroll = () => {
      const sections = list.map(item => {
        const id = item.toLowerCase().replace(/\s+/g, '-');
        const element = document.getElementById(id);
        if (!element) return null;
        
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const elementCenter = elementTop + elementHeight / 2;
        const windowCenter = window.innerHeight / 2;
        
        return {
          id,
          element,
          distanceFromCenter: Math.abs(elementCenter - windowCenter),
          isVisible: elementTop < window.innerHeight && elementTop + elementHeight > 0
        };
      }).filter(Boolean);
      
      // Find the section closest to center that's visible
      const visibleSections = sections.filter(s => s.isVisible);
      if (visibleSections.length > 0) {
        const closest = visibleSections.reduce((prev, current) => 
          current.distanceFromCenter < prev.distanceFromCenter ? current : prev
        );
        setActiveSection(closest.id);
      }
    };
    
    // Initial check
    setTimeout(handleScroll, 100);
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mounted]);


  // Initialize dark mode and mounted state
  useEffect(() => {
    setMounted(true);
    // Check for saved preference or default to false
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    setIsLoading(false);
  }, []);

  // Apply theme changes immediately
  useEffect(() => {
    if (!mounted) return;

    const html = document.documentElement;
    const body = document.body;
    
    if (darkMode) {
      html.classList.add('dark');
      body.classList.add('dark');
    } else {
      html.classList.remove('dark');
      body.classList.remove('dark');
    }
    
    localStorage.setItem('darkMode', darkMode.toString());
    
    // Force a small re-render to ensure state is updated
    setTimeout(() => {
      // This ensures the component re-renders with the new theme
    }, 0);
  }, [darkMode, mounted]);

  

useEffect(() => {
  const container = document.getElementById('mobile-carousel');
  if (!container) return;

  let scrollAmount = 0;
  const slideWidth = container.firstChild?.offsetWidth || 300;

  const interval = setInterval(() => {
    scrollAmount += slideWidth + 16; // 16 = space-x-4
    if (scrollAmount >= container.scrollWidth - container.clientWidth) {
      scrollAmount = 0;
    }
    container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  }, 3000);

  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % experiences.length;
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            left: scrollRef.current.offsetWidth * nextIndex,
            behavior: 'smooth',
          });
        }
        return nextIndex;
      });
    }, 5000); // auto-slide every 5s

    return () => clearInterval(interval);
  }, []);


  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen overflow-auto scroll-smooth hide-scrollbar transition-all duration-300"
      style={{ 
        background: darkMode 
          ? 'linear-gradient(135deg, #111827 0%, #1f2937 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
        color: darkMode ? '#ffffff' : '#111827'
      }}
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full filter blur-xl opacity-70 animate-pulse transition-all duration-300 ${
            darkMode ? 'bg-purple-600 mix-blend-screen' : 'bg-purple-300 mix-blend-multiply'
          }`}
        ></div>
        <div 
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full filter blur-xl opacity-70 animate-pulse transition-all duration-300 ${
            darkMode ? 'bg-yellow-600 mix-blend-screen' : 'bg-yellow-300 mix-blend-multiply'
          }`}
          style={{ animationDelay: '2s' }}
        ></div>
        <div 
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full filter blur-xl opacity-70 animate-pulse transition-all duration-300 ${
            darkMode ? 'bg-pink-600 mix-blend-screen' : 'bg-pink-300 mix-blend-multiply'
          }`}
          style={{ animationDelay: '4s' }}
        ></div>
      </div>



      {/* Modern Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 z-50 w-full backdrop-blur-sm bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-gradient-to-r from-blue-500 to-purple-600 p-0.5"
          >
            <div className="w-full h-full rounded-full overflow-hidden">
              <Image src="/logo-2.jpg" alt="logo" width={48} height={48} className="object-cover" />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {list.map((item, index) => {
              const id = item.toLowerCase().replace(/\s+/g, '-');
              const isActive = activeSection === id;
              return (
                <motion.a
                  key={index}
                  href={`#${id}`}
                  whileHover={{ scale: 1.05 }}
                  className={`relative px-5 py-2.5 rounded-full transition-all duration-300 font-medium ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg'
                      : 'text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  {item}
                  {isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </nav>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 ${
              darkMode 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' 
                : 'bg-gradient-to-r from-slate-700 to-slate-900 text-white'
            }`}
          >
            <motion.i
              key={darkMode ? 'sun' : 'moon'}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={darkMode ? 'ri-sun-line text-xl' : 'ri-moon-line text-xl'}
            />
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
              darkMode 
                ? 'bg-gray-800 text-white hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            <motion.div
              animate={{ rotate: menuOpen ? 180 : 0 }}
              className="text-2xl"
            >
              {menuOpen ? '×' : '☰'}
            </motion.div>
          </button>
        </div>
      </motion.header>



      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className={`fixed top-0 right-0 h-full w-80 backdrop-blur-sm z-50 shadow-2xl md:hidden transition-all duration-300 ${
              darkMode ? 'bg-gray-900' : 'bg-white'
            }`}
          >
            <div className="p-8">
              <button
                onClick={() => setMenuOpen(false)}
                className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-2xl transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-gray-800 text-white hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                ×
              </button>

              <nav className="mt-16 space-y-6">
                {list.map((item, index) => {
                  const id = item.toLowerCase().replace(/\s+/g, '-');
                  const isActive = activeSection === id;
                  return (
                    <motion.a
                      key={index}
                      href={`#${id}`}
                      onClick={() => setMenuOpen(false)}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`block px-6 py-3 rounded-xl text-lg font-medium transition-all duration-300 ${
                        isActive
                          ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600'
                          : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    >
                      {item}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Mobile Theme Toggle */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: list.length * 0.1 }}
                className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700"
              >
                <motion.button
                  onClick={() => setDarkMode(!darkMode)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' 
                      : 'bg-gradient-to-r from-slate-700 to-slate-900 text-white'
                  }`}
                >
                  <motion.i
                    key={darkMode ? 'sun' : 'moon'}
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={darkMode ? 'ri-sun-line text-xl' : 'ri-moon-line text-xl'}
                  />
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center px-6 pt-20 relative">
        <div className="max-w-4xl mx-auto text-center z-10">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-40 h-40 mx-auto mb-8 relative"
          >
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-500 to-purple-600 p-1 float-animation">
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/my-passport-red.jpg"
                  alt="Christopher Aondoakaa"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-20 animate-pulse"></div>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent"
          >
            Christopher Aondoakaa
          </motion.h1>

          {/* Title with typing effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-3xl font-medium mb-6 text-gray-700 dark:text-gray-300"
          >
            <span className="typing-animation">Full-Stack Developer</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Passionate about building scalable, performant applications with modern technologies.
            Specializing in <span className="text-blue-600 dark:text-blue-400 font-semibold">JavaScript</span>, 
            <span className="text-blue-600 dark:text-blue-400 font-semibold"> React.js</span>, 
            <span className="text-blue-600 dark:text-blue-400 font-semibold"> Next.js</span>, and 
            <span className="text-blue-600 dark:text-blue-400 font-semibold"> Node.js</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 pulse-glow"
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-blue-500 text-blue-500 dark:text-blue-400 font-semibold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A showcase of my recent work and the technologies I love working with
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="p-8 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <i className="ri-code-s-slash-line text-white text-xl"></i>
                    </div>
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: 45 }}
                      className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-300"
                    >
                      <i className="ri-external-link-line text-lg"></i>
                    </motion.a>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all duration-300"
                  >
                    View Project
                    <i className="ri-arrow-right-line"></i>
                  </motion.a>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 rounded-2xl transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group-hover:border-blue-500/30">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <i className="ri-code-line text-white text-xl"></i>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {skill}
                    </h3>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="work-experience" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Work Experience
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              My professional journey and the amazing teams I&apos;ve worked with
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 transform md:-translate-x-1/2"></div>

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transform md:-translate-x-1/2 z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping opacity-20"></div>
                </div>

                {/* Content card */}
                <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {exp.company}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1">
                          {exp.role}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {exp.duration}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <i className="ri-building-line text-white text-xl"></i>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.responsibilities.map((responsibility, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                          <i className="ri-check-line text-green-500 mt-0.5 flex-shrink-0"></i>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>

                    {exp.projects.length > 0 && (
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        {exp.projects.map((link, i) => (
                          <motion.a
                            key={i}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 5 }}
                            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all duration-300"
                          >
                            View Project
                            <i className="ri-external-link-line"></i>
                          </motion.a>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Let&apos;s Connect
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let&apos;s discuss how we can work together!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <i className="ri-mail-line text-white text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <a href="mailto:aondoakaachris@gmail.com" className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                    aondoakaachris@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <i className="ri-phone-line text-white text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <a href="tel:+2348030715641" className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                    +234 803 071 5641
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <i className="ri-linkedin-line text-white text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">LinkedIn</p>
                  <a href="https://www.linkedin.com/in/christopher-aondoakaa-89740a171" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                    Christopher Aondoakaa
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                  <i className="ri-github-line text-white text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">GitHub</p>
                  <a href="https://github.com/descmd1" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                    @descmd1
                  </a>
                </div>
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-rocket-line text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
                <p className="text-blue-100 mb-8">
                  Let&apos;s turn your vision into reality. I&apos;m excited to hear about your project and discuss how we can make it happen.
                </p>
                <motion.a
                  href="mailto:aondoakaachris@gmail.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
                >
                  Send Message
                  <i className="ri-send-plane-line"></i>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Image src="/logo-2.jpg" alt="logo" width={48} height={48} className="rounded-full" />
            </div>
            <p className="text-gray-400 mb-4">
              © 2025 Christopher Aondoakaa. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Built with Next.js, Tailwind CSS, and Framer Motion
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
