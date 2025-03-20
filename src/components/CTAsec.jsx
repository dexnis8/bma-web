// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export const CTAsec = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="relative py-20 px-6 md:px-0 overflow-hidden">
        <div className="absolute w-[90%] h-[85%] my-auto mx-auto inset-0 bg-gradient-to-r from-[#0A1B56] to-[#541661] rounded-[40px]"></div>

        <div className="container mx-auto max-w-[1440px] relative z-10">
          <motion.div
            className="flex flex-col items-center text-center px-3 md:px-0 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="bma-heading-1 text-white mb-4 max-w-3xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your Construction Projects?
            </motion.h2>

            <motion.p
              className="bma-body-large mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Experience the superior quality of BMA's Pop Cement and Screening
              Paint
            </motion.p>

            {/* Feature Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-10 justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="flex items-center cursor-pointer gap-2 bg-[#192875]/30 hover:bg-[#192875]/50 transition-colors duration-300 rounded-full px-6 py-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/contact")}
              >
                <motion.img
                  src="/delivery.svg"
                  alt="Fast Delivery"
                  className="h-5 w-5 object-contain"
                  // initial={{ rotate: 0 }}
                  // animate={{ rotate: 360 }}
                />
                <span>Fast Delivery</span>
              </motion.button>

              <motion.button
                className="flex items-center cursor-pointer gap-2 bg-[#192875]/30 hover:bg-[#192875]/50 transition-colors duration-300 rounded-full px-6 py-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/contact")}
              >
                <motion.img
                  src="/call-love.svg"
                  alt="24/7 Support"
                  className="h-5 w-5 object-contain"
                />
                <span>24/7 Support</span>
              </motion.button>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="bg-red-600 cursor-pointer hover:bg-red-700 transition-colors duration-300 text-white font-medium rounded-full px-8 py-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/request-deal")}
              >
                Request Dealership
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
