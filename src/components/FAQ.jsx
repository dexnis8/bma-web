import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export const FAQ = () => {
  return (
    <>
      <section className="py-20 px-6 md:px-10 bg-gray-50">
        <div className="container mx-auto max-w-[1440px]">
          <div className="max-w-3xl mx-auto">
            {/* Section Heading */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="bma-heading-2 text-gray-900 mb-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Frequently Asked Questions
              </motion.h2>
              <motion.p
                className="bma-body text-gray-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Everything you need to know about our premium construction
                materials
              </motion.p>
            </motion.div>

            {/* FAQ Accordion */}
            <div className="space-y-4">
              {/* FAQ Item 1 */}
              <FaqItem
                question="What makes BMA's Pop Cement different from regular cement?"
                answer="BMA's POP Cement is specially formulated for superior strength, faster setting time, and enhanced workability. Unlike regular cement, our POP Cement contains premium additives that improve adhesion, reduce shrinkage, and provide a smoother finish. It's also engineered to be more resistant to cracking and more durable in various environmental conditions."
                delay={0.3}
              />

              {/* FAQ Item 2 */}
              <FaqItem
                question="How long does your Screening Paint typically last?"
                answer="Our Screening Paint is designed for longevity and typically lasts 5-7 years with proper application and under normal conditions. Factors that can affect durability include surface preparation, application method, climate exposure, and foot traffic. We recommend following our application guidelines for maximum lifespan."
                delay={0.4}
              />

              {/* FAQ Item 3 */}
              <FaqItem
                question="Do you provide application guidelines for your products?"
                answer="Yes, we provide detailed application guidelines for all our products. These include surface preparation instructions, mixing ratios, application techniques, curing times, and maintenance recommendations. You can find product-specific guidelines on our product packaging, downloadable PDFs on our website, or by contacting our technical support team."
                delay={0.5}
              />

              {/* FAQ Item 4 */}
              <FaqItem
                question="What surfaces are suitable for BMA Pop Cement?"
                answer="BMA Pop Cement is versatile and suitable for a wide range of surfaces, including concrete, brick, block work, stone, and properly prepared wooden surfaces. It works exceptionally well for interior wall finishing, ceiling designs, decorative moldings, and repair work. For specialized applications or unusual surfaces, we recommend contacting our technical team for specific guidance."
                delay={0.6}
              />

              {/* FAQ Item 5 */}
              <FaqItem
                question="Can I get technical support or consultation for large projects?"
                answer="Absolutely! We offer comprehensive technical support and consultation services for projects of all sizes. For large projects, our team of experts can provide tailored advice, on-site consultation, custom product recommendations, and application training. Contact our customer service department to schedule a consultation or to discuss your specific project requirements."
                delay={0.7}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// FAQ Item Component
const FaqItem = ({ question, answer, delay }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border border-gray-200 rounded-lg overflow-hidden bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-900">{question}</span>
        <span className="text-[#04276B] p-2 rounded-full bg-[#04276B]/30 ml-4">
          {isOpen ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </span>
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-4 text-gray-600">{answer}</div>
      </motion.div>
    </motion.div>
  );
};
