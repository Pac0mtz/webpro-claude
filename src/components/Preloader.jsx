import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Preloader.css";

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("wpc-loaded")) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem("wpc-loaded", "1");
    }, 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="preloader" exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <motion.div
            className="preloader-bar-track"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img className="preloader-mark-img" src="/images/logo-web-pro.png" alt="Web Pro Chicago" width="230" height="100" />
            <motion.div
              className="preloader-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
