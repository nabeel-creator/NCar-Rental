import { ReactLenis } from "lenis/dist/lenis-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import ScrollReveal from "./ScrollReveal.jsx";
import Header from "./Header1.jsx";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import carbg from "./assets/carbg.jpg";
import car1 from "./assets/car1.jpg";
import car2 from "./assets/car2.jpg";
import car3 from "./assets/car3.jpg";
import car4 from "./assets/car4.jpg";
import Rolaycar from "./assets/image-removebg-preview.png";
import supercar from "./assets/supercar.png";
import LightRays from "./lightrays.jsx";

const Landing = () => {
  return (
    <div className="bg-zinc-950">
      <Header />
      <div className="relative ">
      <div className="sticky top-0 h-screen">
        <div className="relative w-full h-full">
          <LightRays
            raysOrigin="top-center"
            raysColor="#00000"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white text-center  mb-3 sm:mb-5"
             
            >
              Drive Your Dreams
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-300 text-center max-w-3xl mb-6 sm:mb-8 px-4"
            >
              Premium car rentals at your fingertips. Experience luxury, comfort, and freedom on every journey.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 items-center"
            >
              <Link to="/home">
              <motion.button
                className="bg-lime-400 hover:bg-lime-500 text-zinc-950 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(163, 230, 53, 0.6)" }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Collection
              </motion.button>
              </Link>
              <Link to="/contact">
              <motion.button
                className="border-2 border-lime-400 text-lime-500 hover:bg-lime-500/10 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </Link>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16 max-w-2xl w-full px-4"
            >
              {[
                { number: "500+", label: "Premium Cars" },
                { number: "50K+", label: "Happy Customers" },
                { number: "24/7", label: "Support" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-lime-400"
                  >
                    {stat.number}
                  </motion.p>
                  <p className="text-xs sm:text-sm md:text-base text-zinc-400 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
     

      {/* ontop section */}
      
        <div className="m-0 p-0 w-full h-28 sm:h-37 md:h-47 flex  justify-center items-baseline mb-16 sm:mb-11 md:mb-14">
          <img src={supercar}  alt="supercar"
          className="z-[1000]"
           />
        </div>
      <div className="relative h-full z-[999] bg-zinc-950 w-full px-4 sm:px-6 py-6">
        <div className="h-auto bg-zinc-950 sm:h-32 w-full border-lime-400 border-2 sm:border-4 rounded-2xl sm:rounded-3xl">
          <div className="h-auto sm:h-27 w-full sm:w-[99%] m-auto sm:mt-1.5 flex flex-col sm:flex-row items-center justify-between border-lime-400 border-2 rounded-xl  bg-zinc-950 sm:rounded-2xl p-4 sm:p-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white sm:p-4 text-center sm:text-left mb-4 sm:mb-0 text-shadow-white">
              Book Your Dream Car Now!
            </h1>
            <Link to='/home'>
            <motion.button
              className="bg-gradient-to-r from-lime-400 to-lime-600 hover:from-lime-500 hover:to-lime-700 rounded-xl text-white px-6 py-3 sm:m-4 sm:mr-6 font-bold text-lg sm:text-xl shadow-lg hover:shadow-xl w-full sm:w-auto"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 25px rgba(163, 230, 53, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 10px 15px rgba(0, 0, 0, 0.3)",
                  "0 0 20px rgba(163, 230, 53, 0.5)",
                  "0 10px 15px rgba(0, 0, 0, 0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Get Started
            </motion.button>
            </Link>
          </div>
        </div>
      
      
      {/* we Are section */}
      <div className="min-h-[570px] flex flex-col lg:flex-row bg-zinc-950 items-center px-4 sm:px-6 lg:px-0">
        <div className="w-full lg:w-3/5 m-5 lg:ml-12 text-white p-3 text-shadow-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white p-4">
            <span className="w-2 h-6 sm:h-9 bg-lime-400 inline-block mr-2"></span> WE ARE'
          </h1>
          <ScrollReveal
            baseOpacity={0.1}
            enableBlur={true}
            baseRotation={5}
            blurStrength={10}
          >
              From daily rentals to premium rides, we make car browsing, booking,
              and buying effortless. Fast, reliable, and designed for modern users
              we connect you with the best cars, best deals for you. Experience
              the future of car rental and ownership with us.
            
          </ScrollReveal>
          <div className="mt-12 sm:mt-16 lg:mt-20 flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
            {["Drive smarter.", "Drive safer.", "Drive with us."].map(
              (text, index) => (
                <motion.div
                  key={index}
                  className="relative inline-block pb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <p className="text-xl sm:text-2xl md:text-3xl font-semibold">{text}</p>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="absolute bottom-0 left-0 h-1 bg-lime-500 origin-left rounded-full w-full"
                  />
                </motion.div>
              )
            )}
          </div>
        </div>
        <div className="w-full lg:w-auto mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0.6, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-136 h-64 sm:h-80 lg:ml-12 flex justify-center"
          >
            <img src={Rolaycar} alt="Rolaycar" className="object-contain" />
          </motion.div>
        </div>
      </div>
      </div>
      </div>
      {/* Section pictures */}
      <h1 className="text-white m-5 ml-6 sm:ml-9 p-3 text-3xl bg-zinc-950 sm:text-4xl md:text-5xl text-shadow-white font-bold">
        <span className="w-2 h-6 sm:h-9 bg-lime-400 inline-block mr-2"></span> Make your Ride Unforgettable
      </h1>
      <SmoothScrollHero />
    </div>
  );
};

const SmoothScrollHero = () => {
  return (
    <div className="bg-zinc-950">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Hero />
        <Schedule />
      </ReactLenis>
    </div>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </div>
  );
};

const CenterImage = () => {
  const ref = useRef(null);
  const [element, setElement] = useState(null);

  useEffect(() => {
    setElement(ref.current);
  }, []);

  const { scrollYProgress } = useScroll({
    target: element ?? undefined,
    offset: ["start center", "end center"],
  });

  const clip1 = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const clip2 = useTransform(scrollYProgress, [0, 1], [75, 100]);

  const clipPath = useMotionTemplate`
    polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)
  `;

  const backgroundSize = useTransform(
    scrollYProgress,
    [0, 1],
    ["170%", "100%"]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: `url(${carbg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src={car1}
        alt="cars"
        start={-200}
        end={200}
        className="w-1/3 rounded"
      />
      <ParallaxImg
        src={car2}
        alt="cars looks great"
        start={200}
        end={-250}
        className="mx-auto w-2/3 rounded"
      />
      <ParallaxImg
        src={car3}
        alt="pearson with cars"
        start={-200}
        end={200}
        className="ml-auto w-1/3 rounded"
      />
      <ParallaxImg
        src={car4}
        alt="cars in city"
        start={0}
        end={-500}
        className="ml-24 w-5/12 rounded"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const Schedule = () => {
  return (
    <section
      id="rental-categories"
      className="mx-auto max-w-5xl px-4 sm:px-6 py-24 sm:py-32 md:py-48 text-white"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-12 sm:mb-16 md:mb-20 text-3xl sm:text-4xl md:text-5xl font-black uppercase text-zinc-50"
      >
        Featured Categories
      </motion.h1>
      <ScheduleItem 
        title="Luxury Sedans" 
        date="From $89/day" 
        location="Premium" 
      />
      <ScheduleItem 
        title="Sports Cars" 
        date="From $199/day" 
        location="High Performance" 
      />
      <ScheduleItem 
        title="SUVs & Crossovers" 
        date="From $79/day" 
        location="Family Friendly" 
      />
      <ScheduleItem 
        title="Electric Vehicles" 
        date="From $99/day" 
        location="Eco-Friendly" 
      />
      <ScheduleItem 
        title="Convertibles" 
        date="From $149/day" 
        location="Summer Special" 
      />
      <ScheduleItem 
        title="Executive Class" 
        date="From $249/day" 
        location="Business Elite" 
      />
      <ScheduleItem 
        title="Economy Cars" 
        date="From $39/day" 
        location="Budget Friendly" 
      />
    </section>
  );
};

const ScheduleItem = ({ title, date, location }) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-6 sm:mb-9 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-zinc-800 px-3 pb-6 sm:pb-9 gap-3 sm:gap-0"
    >
      <div className="w-full sm:w-auto">
        <p className="mb-1.5 text-lg sm:text-xl text-zinc-50">{title}</p>
        <p className="text-sm uppercase text-zinc-500">{date}</p>
      </div>
      <div className="flex items-center gap-1.5 text-start sm:text-end text-sm uppercase text-zinc-500">
        <p>{location}</p>
      </div>
    </motion.div>
  );
};

export default Landing;