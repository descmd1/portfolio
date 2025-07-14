
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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
    // link: 'https://yourproject5.demo',
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
  'Projects', 'Skills', 'Work Experience', 'Contact'
]
export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(() => {
    // Ensure this runs only in the browser
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true'
    }
    return false
  })
  const [activeSection, setActiveSection] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
const scrollRef = useRef(null);
const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
      }
    });
  },
  {
    threshold: 0.5, 
  }
);
    list.forEach((item) => {
      const id = item.toLowerCase().replace(/\s+/g, '-');
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
    
  }, [activeSection]);


// useEffect(() => {
//   if (darkMode) {
//     document.documentElement.classList.add('dark');
//   } else {
//     document.documentElement.classList.remove('dark');
//   }
//   localStorage.setItem('darkMode', darkMode);
// }, [darkMode]);

  useEffect(() => {
    if (typeof window === 'undefined') return

    const html = document.documentElement

    if (darkMode) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }

    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  

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
  }, [experiences.length]);


  return (
    <div className="h-auto overflow-auto scroll-smooth bg-white dark:bg-gray-900 text-gray-900 dark:text-white hide-scrollbar
                md:h-screen md:overflow-scroll md:snap-y md:snap-mandatory">

     <>
      {/* Header */}
      <div className="fixed top-0 left-0 z-50 w-full shadow-md bg-gray-900 text-white">
        <div className="flex justify-between items-center w-full px-4 sm:px-8 md:px-10 lg:px-50 py-4">
          {/* Logo */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
            <Image src="/logo-2.jpg" alt="logo" width={40} height={40} />
          </div>

          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl"
            aria-label="Toggle Menu"
          >
            {menuOpen ? '×' : '☰'}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-between items-center gap-6">
            <ul className="flex gap-4">
              {list.map((item, index) => {
                const id = item.toLowerCase().replace(/\s+/g, '-');
                const isActive = activeSection === id;
                return (
                  <li key={index}>
                    <a
                      href={`#${id}`}
                      className={`transition-colors duration-200 hover:text-blue-400 ${
                        isActive ? 'text-blue-400 font-semibold' : 'text-gray-300'
                      }`}
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
           
          </div>
           <button
              onClick={() => setDarkMode(!darkMode)}
             className="w-8 h-8 flex items-center justify-center text-black dark:text-white rounded-full hover:bg-gray-300 transition-colors duration-300 ease-in-out dark:hover:bg-gray-700 md:flex hidden"
            >
              {darkMode ? <i className="ri-sun-line" /> : <i className="ri-moon-line" />}
            </button>
        </div>
      </div>

{menuOpen && (
  <div className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 z-50 shadow-lg md:hidden transition-transform duration-300 transform translate-x-0 p-6">
    <button
      onClick={() => setMenuOpen(false)}
      className="absolute top-4 right-4 text-3xl"
    >
      ×
    </button>

    <ul className="flex flex-col gap-6 mt-10 text-lg">
      {list.map((item, index) => {
        const id = item.toLowerCase().replace(/\s+/g, '-');
        const isActive = activeSection === id;

        return (
          <li key={index}>
            <a
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
              className={`transition-colors duration-200 hover:text-blue-600 ${
                isActive ? 'text-blue-600 font-semibold' : 'text-gray-800 dark:text-gray-300'
              }`}
            >
              {item}
            </a>
          </li>
        );
      })}
    </ul>

    <button
      onClick={() => {
        setDarkMode(!darkMode);
        setMenuOpen(false);
      }}
      className="mt-10 bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-2 rounded"
    >
      {darkMode ? <i className="ri-sun-line"></i> : <i className="ri-moon-line"></i>}
    </button>
  </div>
)}  
</>



      <section className="md:snap-start md:h-screen h-auto flex flex-col justify-center items-center p-10 z-10">
       
          
        <div className="w-30 h-30 rounded-full overflow-hidden border-2 border-gray-300 mb-5 mt-16 md:mt-4">
  <Image
    src="/my-passport-red.jpg"
    alt="image"
    width={150}
    height={150}
    className="object-cover"
  />
</div>
    
        <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="md:text-xl font-bold mb-4 text-xl md:text-left">
          Christopher Aondoakaa
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-lg max-w-xl text-center">
          Full-stack developer, Frontend-end developer, Backend-end developer passionate about building scalable, performant applications.
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-lg max-w-xl text-center mt-2">
          My stack include Javascript | React.Js | Next.Js | Node.Js
        </motion.p>
      </section>

     <section id="projects" className="md:snap-start md:h-screen h-auto flex flex-col items-center p-10 scroll-mt-20 scroll-pt-24">
  <motion.h2
    initial={{ opacity: 0, y: -30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="md:text-4xl text-xl font-semibold mb-6"
  >
    Projects Showcase
  </motion.h2>

  {/* Mobile: Horizontal scrollable row */}
<div
  className="flex md:hidden overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar w-full h-full"
  id="mobile-carousel"
>
  {projects.map((project, index) => (
    <motion.div
      key={index}
      whileHover={{ scale: 1.02 }}
      className="w-full flex-shrink-0 snap-center p-6 border rounded-lg shadow-lg dark:border-gray-700"
    >
      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
      <p className="mb-4">{project.description}</p>
      <Link href={project.link} className="text-blue-600 dark:text-blue-400">
        View Demo
      </Link>
    </motion.div>
  ))}
</div>


  {/* Desktop Grid */}
  <div className="hidden md:grid grid-cols-2 gap-8 w-full max-w-6xl">
    {projects.map((project, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.05 }}
        className="p-6 border rounded-lg shadow-lg dark:border-gray-700"
      >
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="mb-4">{project.description}</p>
        <Link href={project.link} className="text-blue-600 dark:text-blue-400">
          View Demo
        </Link>
      </motion.div>
    ))}
  </div>
</section>


      <section id='skills' className="md:snap-start md:h-screen h-auto flex flex-col items-center p-10 scroll-pt-24">
        <motion.h2 initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="md:text-4xl text-xl font-semibold mb-6">
          Technical Skills
        </motion.h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <motion.li key={index} whileHover={{ scale: 1.1 }} className="p-4 bg-white dark:bg-gray-800 shadow rounded text-center font-semibold">
              {skill}
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Mobile: Horizontal scrollable work experience */}
<section
      id="work-experience"
      className="md:snap-start md:h-screen h-auto flex flex-col items-center p-10 overflow-y-auto hide-scrollbar scroll-pt-24"
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="md:text-4xl text-xl font-semibold mb-6"
      >
        Work Experience
      </motion.h2>

      {/* Mobile: Horizontal carousel */}
      <div
        ref={scrollRef}
        className="flex md:hidden w-full overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar"
      >
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="w-full flex-shrink-0 snap-center p-6 border dark:border-gray-700 rounded-lg shadow"
          >
            <div className="mb-2">
              <p className="font-bold text-xl">{exp.company}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {exp.role} — {exp.duration}
              </p>
            </div>
            <ul className="list-disc list-inside text-sm mb-2">
              {exp.responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
            <div className="text-sm">
              {exp.projects.map((link, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 block"
                >
                  View Project
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 md:hidden">
        {experiences.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 mx-1 rounded-full transition-all duration-300 ${
              currentIndex === i ? 'bg-blue-600' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Desktop: Vertical list */}
      <ul className="hidden md:block space-y-6 max-w-3xl w-full">
        {experiences.map((exp, index) => (
          <motion.li
            key={index}
            whileHover={{ scale: 1.02 }}
            className="p-6 border dark:border-gray-700 rounded-lg shadow"
          >
            <div className="mb-2">
              <p className="font-bold text-xl">{exp.company}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {exp.role} — {exp.duration}
              </p>
            </div>
            <ul className="list-disc list-inside text-sm mb-2">
              {exp.responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
            <div className="text-sm">
              {exp.projects.map((link, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 block"
                >
                  View Project
                </a>
              ))}
            </div>
          </motion.li>
        ))}
      </ul>
    </section>


      <section id='contact' className="md:snap-start md:h-screen h-auto flex flex-col items-center justify-center p-10">
        <motion.h2 initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="md:text-4xl font-semibold mb-6 text-xl">
          Contact Me
        </motion.h2>
        <div className="text-center">
          <p className="text-lg mb-2">Email: <a href="mailto:aondoakaachris@gmail.com" className="text-blue-600 dark:text-blue-400">aondoakaachris@gmail.com</a></p>
          <p className="text-lg">Phone: <a href="tel:+2348030715641" className="text-blue-600 dark:text-blue-400">+2348030715641</a></p>
          <p className="text-lg">Linkedin: <a href="www.linkedin.com/in/christopher-aondoakaa-89740a171" className="text-blue-600 dark:text-blue-400">www.linkedin.com/in/christopher-aondoakaa-89740a171</a></p>
          <p className="text-lg">Git: <a href="https://github.com/descmd1" className="text-blue-600 dark:text-blue-400">https://github.com/descmd1</a></p>
        </div>
      </section>
    </div>
  );
}
