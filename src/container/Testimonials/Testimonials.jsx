import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import "./Testimonial.scss";
import { AppWrap } from "../../wrapper";
import { client, urlFor } from "../../client";
const Testimonial = () => {
  const [testimonials, setTestimoials] = useState([]);
  const [brands, setBrands] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const query = '*[_type == "testimonials"]';
    const brandsQuery = '*[_type == "brands"]';

    client.fetch(query).then((data) => {
      setTestimoials(data);
    });
    client.fetch(brandsQuery).then((data) => {
      setBrands(data);
    });
    //eslint-disable-next-line
  }, []);
  return (
    <>
      {testimonials.length && (
        <>
          <div className="app__testimonial-item app__flex">
            <img src={urlFor(testimonials[currentIndex].imgUrl)} alt="img" />
            <div className="app__testimonial-content">
              <p className="p-text">{testimonials[currentIndex].feedback}</p>
              <div>
                <h4 className="bold-text">{testimonials[currentIndex].name}</h4>
                <h5 className="p-text">{testimonials[currentIndex].company}</h5>
              </div>
            </div>
          </div>
          {testimonials.length > 1 && (
            <div className="app__testimonial-btns app__flex">
              <div
                className="app__flex"
                onClick={() =>
                  handleClick(
                    currentIndex === 0
                      ? testimonials.length - 1
                      : currentIndex - 1
                  )
                }
              >
                <HiChevronLeft />
              </div>
              <div
                className="app__flex"
                onClick={() =>
                  handleClick(
                    currentIndex === testimonials.length - 1
                      ? 0
                      : currentIndex + 1
                  )
                }
              >
                <HiChevronRight />
              </div>
            </div>
          )}
          {brands.length > 0 && (
            <div className="app__testimonial-brands app__flex">
              {brands.map((item, index) => (
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 0.5, type: "tween" }}
                  key={Math.random()}
                >
                  <img src={urlFor(item.imgUrl)} alt={item.name} />
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AppWrap(Testimonial, "testimonial");
