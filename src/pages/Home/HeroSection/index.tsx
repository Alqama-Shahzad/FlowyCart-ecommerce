import styles from "./index.module.scss";
import Button from "../../../components/components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { heroImages } from "../../../data/images";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <div className={styles.content_wrapper}>
          <motion.header 
            className={styles.header}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className={styles.title}>
              <span className={styles.highlight}>Unleash</span> Your Style
            </h1>
            <h1 className={styles.title}>
              Find Your <span className={styles.highlight}>Flow</span>
            </h1>
            <p className={styles.subtitle}>
              Discover the latest trends and express yourself with our premium collection
            </p>
          </motion.header>
          
          <motion.div 
            className={styles.buttons_wrapper}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <Button to="/catalog/All" className={`${styles.button} ${styles.primary}`}>
              Shop Now
            </Button>
            <Button to="/catalog/New" className={`${styles.button} ${styles.secondary}`}>
              New Arrivals
            </Button>
          </motion.div>
          
          <motion.div
            className={styles.imageContainer}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <Swiper
              pagination={{
                dynamicBullets: true,
                clickable: true,
              }}
              effect="fade"
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
              modules={[Pagination, Autoplay, EffectFade]}
              className={styles.image}
            >
              {heroImages.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className={styles.imageWrapper}>
                      <img src={item.path} alt={`Hero image ${index + 1}`} loading="eager" />
                      <div className={styles.overlay}>
                        <div className={styles.overlayContent}>
                          <h2>{item.title || "Premium Collection"}</h2>
                          <p>{item.description || "Discover our exclusive selection"}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </motion.div>
          
          <div className={styles.scrollIndicator}>
            <motion.div 
              className={styles.scrollIcon}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1,
                delay: 1,
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            <span>Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
