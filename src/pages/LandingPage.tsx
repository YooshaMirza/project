import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useAuthStore } from '../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Calendar,
  MessageSquare, 
  Briefcase, 
  GraduationCap,
  Network,
  TrendingUp,
  Award,
  ArrowRight,
  Check,
  Star
} from 'lucide-react';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Floating animation for background elements
const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0, 10, 0],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

const pulseAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

export function LandingPage() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [hoveredTestimonial, setHoveredTestimonial] = useState<number | null>(null);
  
  // Scroll to top on component mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - Enhanced with animations */}
        <section className="relative overflow-hidden bg-gradient-to-r from-primary-800 via-primary-700 to-primary-900 py-28 text-white">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 opacity-20 blur-3xl"
              animate={{
                x: [0, 10, 0, -10, 0],
                y: [0, -10, 0, 10, 0],
              }}
              transition={{
                duration: 20,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
            <motion.div
              className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-gradient-to-bl from-accent-400 to-accent-600 opacity-20 blur-3xl"
              animate={{
                x: [0, -10, 0, 10, 0],
                y: [0, 10, 0, -10, 0],
              }}
              transition={{
                duration: 15,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                delay: 1
              }}
            />
            <motion.div
              className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-tr from-secondary-400 to-secondary-600 opacity-20 blur-3xl"
              animate={{
                x: [0, 15, 0, -15, 0],
                y: [0, -5, 0, 5, 0],
              }}
              transition={{
                duration: 18,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                delay: 2
              }}
            />
          </div>
          
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-10"></div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-900/80"></div>
          
          <div className="container relative mx-auto px-4 text-center sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.h1 
                variants={fadeIn}
                className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
              >
                Connect With Your <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">Alumni Network</span>
                  <span className="absolute bottom-0 left-0 h-3 w-full rounded-sm bg-accent-500/20"></span>
                </span>
              </motion.h1>
              
              <motion.p 
                variants={fadeIn}
                className="mx-auto mb-8 max-w-2xl text-lg text-gray-100 sm:text-xl"
              >
                Stay connected with fellow alumni, explore career opportunities, and participate in exclusive events through our comprehensive alumni platform.
              </motion.p>
              
              <motion.div 
                variants={fadeIn}
                className="flex flex-col justify-center gap-4 sm:flex-row"
              >
                {!isAuthenticated && (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button 
                        size="lg"
                        className="group relative overflow-hidden bg-white pr-10 text-primary-800 shadow-lg transition-all hover:bg-gray-100 hover:pr-12 hover:shadow-xl"
                        onClick={() => navigate('/signup')}
                      >
                        Join Now
                        <motion.span 
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          initial={{ x: 0 }}
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "loop"
                          }}
                        >
                          <ArrowRight size={16} />
                        </motion.span>
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button 
                        size="lg"
                        variant="outline"
                        className="border-white text-white backdrop-blur-sm transition-all hover:bg-white/20"
                        onClick={() => navigate('/login')}
                      >
                        Sign In
                      </Button>
                    </motion.div>
                  </>
                )}
                
                {isAuthenticated && (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button 
                        size="lg"
                        className="group relative overflow-hidden bg-white pr-10 text-primary-800 shadow-lg transition-all hover:bg-gray-100 hover:pr-12 hover:shadow-xl"
                        onClick={() => navigate('/directory')}
                      >
                        View Directory
                        <motion.span 
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          initial={{ x: 0 }}
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "loop"
                          }}
                        >
                          <ArrowRight size={16} />
                        </motion.span>
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button 
                        size="lg"
                        variant="outline"
                        className="border-white text-white backdrop-blur-sm transition-all hover:bg-white/20"
                        onClick={() => navigate('/feed')}
                      >
                        Go to Feed
                      </Button>
                    </motion.div>
                  </>
                )}
              </motion.div>
              
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="mt-16 grid grid-cols-2 gap-8 text-center md:grid-cols-4"
              >
                {[
                  { icon: <Users size={24} />, count: "10,000+", label: "Alumni" },
                  { icon: <Briefcase size={24} />, count: "500+", label: "Companies" },
                  { icon: <Calendar size={24} />, count: "200+", label: "Annual Events" },
                  { icon: <Network size={24} />, count: "50+", label: "Countries" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeIn}
                    className="flex flex-col items-center"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <motion.div 
                      className="flex h-18 w-18 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 0 20px rgba(255,255,255,0.3)",
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-white/30 to-white/10 shadow-inner">
                        {stat.icon}
                      </div>
                    </motion.div>
                    <p className="mt-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-2xl font-bold text-transparent">{stat.count}</p>
                    <p className="text-sm text-gray-200">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
          
          {/* Decorative wave shape at the bottom */}
          <svg
            className="absolute bottom-0 left-0 w-full translate-y-0.5"
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 50H288C432 50 576 0 720 0C864 0 1008 50 1152 50H1440V100H0V50Z"
              fill="white"
            />
          </svg>
        </section>
        
        {/* Features Section - Enhanced with more animations and hover effects */}
        <section className="py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mx-auto max-w-3xl text-center"
            >
              <span className="mb-3 inline-block rounded-full bg-primary-50 px-4 py-1 text-sm font-medium text-primary-600">
                Platform Features
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                <span className="relative">
                  <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    Connect, Engage, and Grow Together
                  </span>
                  <span className="absolute left-0 top-full mt-1 h-1 w-full rounded bg-gradient-to-r from-primary-400 to-secondary-400 opacity-70"></span>
                </span>
              </h2>
              
              <p className="mt-6 text-lg text-gray-600">
                Our platform provides all the tools you need to stay connected with your alma mater and fellow alumni around the world.
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  icon: <Users size={24} />,
                  gradient: "from-primary-500 to-primary-700",
                  bgGradient: "from-primary-50 to-primary-100",
                  borderColor: "border-primary-200",
                  title: "Alumni Directory",
                  description: "Search and connect with alumni based on graduation year, field of study, location, or profession.",
                  highlight: "10,000+ Members"
                },
                {
                  icon: <MessageSquare size={24} />,
                  gradient: "from-secondary-500 to-secondary-700",
                  bgGradient: "from-secondary-50 to-secondary-100",
                  borderColor: "border-secondary-200",
                  title: "Community Feed",
                  description: "Share updates, post job opportunities, and stay informed with the latest news from your alumni community.",
                  highlight: "Active Discussions"
                },
                {
                  icon: <Calendar size={24} />,
                  gradient: "from-accent-500 to-accent-700",
                  bgGradient: "from-accent-50 to-accent-100",
                  borderColor: "border-accent-200",
                  title: "Events & Meetups",
                  description: "Discover and attend alumni events, reunions, and networking opportunities in your area or virtually.",
                  highlight: "Monthly Events"
                },
                {
                  icon: <Briefcase size={24} />,
                  gradient: "from-emerald-500 to-emerald-700",
                  bgGradient: "from-emerald-50 to-emerald-100",
                  borderColor: "border-emerald-200",
                  title: "Career Opportunities",
                  description: "Access exclusive job postings, mentorship programs, and career resources from fellow alumni.",
                  highlight: "500+ Companies"
                },
                {
                  icon: <TrendingUp size={24} />,
                  gradient: "from-blue-500 to-blue-700",
                  bgGradient: "from-blue-50 to-blue-100",
                  borderColor: "border-blue-200",
                  title: "Professional Growth",
                  description: "Enhance your skills through workshops, webinars, and learning resources provided by successful alumni.",
                  highlight: "Weekly Webinars"
                },
                {
                  icon: <Award size={24} />,
                  gradient: "from-violet-500 to-violet-700",
                  bgGradient: "from-violet-50 to-violet-100",
                  borderColor: "border-violet-200",
                  title: "Achievement Showcase",
                  description: "Highlight your accomplishments and celebrate the success stories of fellow alumni.",
                  highlight: "Success Stories"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br ${feature.bgGradient} ${feature.borderColor} p-1 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative h-full rounded-xl bg-white/90 p-7 backdrop-blur-sm transition-all">
                    {/* Background gradient circle */}
                    <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${feature.gradient} opacity-10 blur-xl transition-all duration-500 group-hover:opacity-20`}></div>
                    
                    <div className="relative z-10">
                      <div className={`mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
                        {feature.icon}
                      </div>
                      
                      <h3 className="mb-3 text-xl font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                      
                      <p className="mb-4 text-gray-600">
                        {feature.description}
                      </p>
                      
                      <div className={`inline-flex items-center rounded-full bg-gradient-to-r ${feature.bgGradient} px-3 py-1 text-xs font-medium`}>
                        <span className={`mr-1 text-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>{feature.highlight}</span>
                      </div>
                    </div>
                    
                    {/* Animated corner design element */}
                    <motion.div 
                      className={`absolute bottom-0 right-0 h-16 w-16 rounded-tl-3xl bg-gradient-to-tl ${feature.gradient} opacity-10`}
                      animate={hoveredFeature === index ? { 
                        width: 80, 
                        height: 80, 
                        opacity: 0.15, 
                        transition: { duration: 0.3 } 
                      } : { 
                        width: 64, 
                        height: 64, 
                        opacity: 0.1, 
                        transition: { duration: 0.3 } 
                      }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* New Section: How It Works */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 py-24">
          <div className="absolute top-0 left-0 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-white">
              <path fill="currentColor" fillOpacity="1" d="M0,96L80,117.3C160,139,320,181,480,181.3C640,181,800,139,960,149.3C1120,160,1280,224,1360,256L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
            </svg>
          </div>
          
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="mx-auto mb-16 max-w-3xl text-center"
            >
              <span className="mb-3 inline-block rounded-full bg-secondary-50 px-4 py-1 text-sm font-medium text-secondary-600">
                Simple Process
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                <span className="bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent">
                  How AlumniConnect Works
                </span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Getting started with our platform is easy and straightforward
              </p>
            </motion.div>
            
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-primary-300 via-secondary-300 to-accent-300 opacity-50 sm:hidden"></div>
              <div className="absolute top-1/2 left-0 hidden h-1 w-full -translate-y-1/2 bg-gradient-to-r from-primary-300 via-secondary-300 to-accent-300 opacity-50 sm:block"></div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="relative grid gap-12 sm:grid-cols-3"
              >
                {[
                  {
                    step: "01",
                    title: "Create Your Profile",
                    description: "Sign up and complete your alumni profile with your education, career, and interests",
                    gradient: "from-primary-400 to-primary-600",
                    shadow: "shadow-primary-500/20"
                  },
                  {
                    step: "02",
                    title: "Connect with Alumni",
                    description: "Search the directory and connect with fellow graduates from your alma mater",
                    gradient: "from-secondary-400 to-secondary-600",
                    shadow: "shadow-secondary-500/20"
                  },
                  {
                    step: "03",
                    title: "Engage & Grow",
                    description: "Participate in events, discussions, and career opportunities within the community",
                    gradient: "from-accent-400 to-accent-600",
                    shadow: "shadow-accent-500/20"
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    className="flex flex-col items-center"
                    whileHover={{ y: -5 }}
                  >
                    <motion.div
                      className={`relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${step.gradient} text-white ${step.shadow}`}
                      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,0,0,0.1)" }}
                      initial="initial"
                      animate="animate"
                      variants={pulseAnimation}
                    >
                      <span className="text-xl font-bold">{step.step}</span>
                      <div className={`absolute -inset-3 rounded-full border border-dashed border-${step.gradient.split('-')[1]}-300 opacity-50`}></div>
                    </motion.div>
                    
                    <h3 className="mt-6 text-xl font-bold text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-center text-gray-600">{step.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="mx-auto mt-16 flex max-w-md justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button 
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-primary-600 to-secondary-600 pr-10 text-white shadow-lg transition-all hover:shadow-xl"
                  onClick={() => navigate(isAuthenticated ? '/directory' : '/signup')}
                >
                  {isAuthenticated ? 'Explore Now' : 'Get Started'} 
                  <motion.span 
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  >
                    <ArrowRight size={16} />
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Testimonials - Enhanced with animations and modern cards */}
        <section className="overflow-hidden py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mx-auto max-w-3xl text-center"
            >
              <span className="mb-3 inline-block rounded-full bg-accent-50 px-4 py-1 text-sm font-medium text-accent-600">
                Testimonials
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                <span className="bg-gradient-to-r from-accent-600 to-primary-600 bg-clip-text text-transparent">
                  Hear From Our Alumni
                </span>
              </h2>
              
              <p className="mt-4 text-lg text-gray-600">
                Discover how AlumniConnect has helped alumni stay connected and advance their careers.
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  quote: "AlumniConnect has been a game-changer for me. I found my current job through a connection I made on the platform, and I've attended several networking events that have expanded my professional circle.",
                  name: "Michael Chen",
                  role: "Class of 2018, Software Engineer",
                  image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
                  gradient: "from-blue-50 to-blue-100",
                  borderColor: "border-blue-200",
                  accentColor: "bg-blue-500"
                },
                {
                  quote: "I've reconnected with so many of my classmates through AlumniConnect. The platform makes it easy to find old friends and stay updated on what everyone is doing. It's like having a digital alumni reunion everyday!",
                  name: "Sarah Johnson",
                  role: "Class of 2016, Marketing Director",
                  image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
                  gradient: "from-pink-50 to-pink-100",
                  borderColor: "border-pink-200",
                  accentColor: "bg-pink-500"
                },
                {
                  quote: "As someone who moved abroad after graduation, AlumniConnect has been my lifeline to my alma mater. I can participate in virtual events, connect with alumni in my new country, and still feel part of the community.",
                  name: "James Rodriguez",
                  role: "Class of 2019, Financial Analyst",
                  image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150",
                  gradient: "from-amber-50 to-amber-100",
                  borderColor: "border-amber-200",
                  accentColor: "bg-amber-500"
                }
              ].map((testimonial, index) => (
                <motion.div 
                  key={index}
                  variants={fadeIn}
                  className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br ${testimonial.gradient} ${testimonial.borderColor} p-1 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
                  onMouseEnter={() => setHoveredTestimonial(index)}
                  onMouseLeave={() => setHoveredTestimonial(null)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative h-full rounded-xl bg-white/90 p-8 backdrop-blur-sm">
                    {/* Decorative elements */}
                    <div className="absolute left-6 top-6 h-20 w-20 -rotate-12 text-gray-200 opacity-30">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.269.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.269.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
                      </svg>
                    </div>
                    
                    {/* Top quote mark decorative element */}
                    <div className={`absolute -right-4 -top-4 h-16 w-16 rounded-full ${testimonial.accentColor} opacity-10 blur-xl transition-all duration-500 group-hover:opacity-20`}></div>
                    
                    <div className="relative z-10">
                      <div className="mb-4 flex">
                        {[...Array(5)].map((_, i) => (
                          <motion.svg 
                            key={i}
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="#F59E0B" 
                            className="h-5 w-5"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <path 
                              fillRule="evenodd" 
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd" 
                            />
                          </motion.svg>
                        ))}
                      </div>
                      
                      <blockquote className="mb-6 text-gray-700">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div className="flex items-center">
                        <motion.div 
                          className="relative mr-4 h-14 w-14 overflow-hidden rounded-full ring-2 ring-primary-100"
                          whileHover={{ scale: 1.1 }}
                          animate={hoveredTestimonial === index ? { 
                            boxShadow: "0 0 0 2px rgba(79, 70, 229, 0.3)" 
                          } : {}}
                        >
                          <img 
                            src={testimonial.image}
                            alt="Alumni" 
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </motion.div>
                        
                        <div>
                          <p className="font-semibold text-gray-900">{testimonial.name}</p>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom decorative element */}
                    <motion.div 
                      className={`absolute bottom-0 right-0 h-16 w-16 rounded-tl-3xl ${testimonial.accentColor} opacity-10`}
                      animate={hoveredTestimonial === index ? { 
                        width: 80, 
                        height: 80, 
                        opacity: 0.15, 
                        transition: { duration: 0.3 } 
                      } : { 
                        width: 64, 
                        height: 64, 
                        opacity: 0.1, 
                        transition: { duration: 0.3 } 
                      }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* CTA Section - Enhanced with modern design */}
        <section className="relative overflow-hidden py-24 sm:py-32">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900"></div>
          
          {/* Background circles */}
          <motion.div
            className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-secondary-700 opacity-30 blur-3xl"
            animate={{
              x: [0, -10, 0, 10, 0],
              y: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 20,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary-700 opacity-30 blur-3xl"
            animate={{
              x: [0, 10, 0, -10, 0],
              y: [0, -10, 0, 10, 0],
            }}
            transition={{
              duration: 23,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
          
          {/* Light beams */}
          <div className="absolute top-1/3 right-1/4 h-32 w-[40%] rotate-45 bg-white opacity-10 blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 h-32 w-[40%] -rotate-45 bg-white opacity-10 blur-3xl"></div>
          
          <div className="container relative mx-auto px-4 text-center sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mx-auto max-w-3xl space-y-8"
            >
              <motion.h2 
                variants={fadeIn}
                className="mb-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl"
              >
                {isAuthenticated 
                  ? "Explore All Features of Your Alumni Network" 
                  : "Ready to Connect with Your Alumni Network?"}
              </motion.h2>
              
              <motion.p 
                variants={fadeIn}
                className="mx-auto mb-8 max-w-2xl text-lg text-gray-200"
              >
                {isAuthenticated
                  ? "Make the most of your membership by exploring all the features and opportunities available to you."
                  : "Join thousands of alumni who have already discovered the benefits of our platform. Sign up today and start building valuable connections!"}
              </motion.p>
              
              <motion.div
                variants={fadeIn}
                className="flex flex-col justify-center gap-4 sm:flex-row"
              >
                {!isAuthenticated && (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button 
                        size="lg"
                        className="relative overflow-hidden bg-white pr-10 text-secondary-800 shadow-lg transition-all hover:bg-white/90 hover:shadow-xl"
                        onClick={() => navigate('/signup')}
                      >
                        Join Now
                        <motion.span 
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "loop"
                          }}
                        >
                          <ArrowRight size={16} />
                        </motion.span>
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button 
                        size="lg"
                        variant="outline"
                        className="border-white text-white backdrop-blur-sm transition-all hover:bg-white/20"
                        onClick={() => navigate('/login')}
                      >
                        Learn More
                      </Button>
                    </motion.div>
                  </>
                )}
                
                {isAuthenticated && (
                  <>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button 
                        size="lg"
                        className="relative overflow-hidden bg-white pr-10 text-secondary-800 shadow-lg transition-all hover:bg-white/90 hover:shadow-xl"
                        onClick={() => navigate('/events')}
                      >
                        Browse Events
                        <motion.span 
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "loop"
                          }}
                        >
                          <ArrowRight size={16} />
                        </motion.span>
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button 
                        size="lg"
                        variant="outline"
                        className="border-white text-white backdrop-blur-sm transition-all hover:bg-white/20"
                        onClick={() => navigate('/directory')}
                      >
                        Find Alumni
                      </Button>
                    </motion.div>
                  </>
                )}
              </motion.div>
              
              {/* Features list */}
              <motion.div 
                variants={fadeIn}
                className="mt-12 flex flex-col items-center justify-center"
              >
                <div className="grid max-w-2xl grid-cols-1 gap-3 px-4 sm:grid-cols-2 sm:gap-4">
                  {[
                    "Exclusive Alumni Directory",
                    "Networking Events",
                    "Career Opportunities",
                    "Mentorship Programs",
                    "Digital Community Feed",
                    "Achievement Showcase"
                  ].map((feature, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center rounded-lg bg-white/10 px-4 py-3 backdrop-blur-sm"
                    >
                      <Check size={18} className="mr-2 text-accent-300" />
                      <span className="text-sm font-medium text-white">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}