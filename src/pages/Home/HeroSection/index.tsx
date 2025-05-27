import styles from "./index.module.scss";
import Button from "../../../components/components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";
import { motion } from "framer-motion";

// Import images directly
import hero1 from "../../../assets/images/hero1.jpg";
import hero2 from "../../../assets/images/hero2.jpg";
import hero3 from "../../../assets/images/hero3.jpg";

// Define hero data
const heroData = [
  {
    image: hero1,
    title: "Minimalist Essentials",
    description: "Timeless pieces for the modern wardrobe"
  },
  {
    image: hero2,
    title: "Premium Outerwear",
    description: "Sophisticated styles for every occasion"
  },
  {
    image: hero3,
    title: "Urban Collection",
    description: "Express your unique style with our latest designs"
  }
];

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
              <span className={styles.highlight}>Premium</span> Collection
            </h1>
            <p className={styles.subtitle}>
              Elevate your style with our curated selection of high-quality fashion essentials
            </p>
          </motion.header>
          
          <motion.div 
            className={styles.buttons_wrapper}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <Button to="/catalog/All" className={`${styles.button} ${styles.primary}`}>
              Shop Collection
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
              navigation={true}
              effect="fade"
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
              modules={[Pagination, Autoplay, EffectFade, Navigation]}
              className={styles.image}
            >
              {heroData.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className={styles.imageWrapper}>
                      <img src={item.image} alt={`${item.title} - Premium Collection`} loading="eager" />
                      <div className={styles.overlay}>
                        <div className={styles.overlayContent}>
                          <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            {item.title}
                          </motion.h2>
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                          >
                            {item.description}
                          </motion.p>
                          <motion.div
                            className={styles.overlayButton}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                          >
                            <Button to={`/catalog/${item.title.split(' ')[0]}`} className={styles.shopButton}>
                              Explore
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </motion.div>
          
          <div className={styles.featuresSection}>
            <motion.div 
              className={styles.feature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Fast Delivery</h3>
              <p>Free shipping on all orders</p>
            </motion.div>
            
            <motion.div 
              className={styles.feature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Premium Quality</h3>
              <p>Handpicked materials</p>
            </motion.div>
            
            <motion.div 
              className={styles.feature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 22H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Easy Returns</h3>
              <p>30-day return policy</p>
            </motion.div>
          </div>
          
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
