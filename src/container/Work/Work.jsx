import React, { useEffect, useState } from "react";
import "./Work.scss";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";
import { AppWrap } from "../../wrapper";
import { client, urlFor } from "../../client";
const Work = () => {
  const [works, setWorks] = useState([]);
  const [filterWorks, setFilterWorks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [animationCard, setAnimationCard] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWorks(data);
    });
    //eslint-disable-next-line
  }, []);

  const handWorkFIlter = (item) => {
    setActiveFilter(item);
    setAnimationCard([{ y: 100, opacity: 0 }]);
    setTimeout(() => {
      setAnimationCard([{ y: 0, opacity: 1 }]);
      if (item === "All") {
        setFilterWorks(item);
      } else {
        setFilterWorks(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };
  return (
    <>
      <h2 className="head-text">
        My Creative <span>Project</span>
        <br /> That <span>I've Work on</span>
      </h2>
      <div className="app__work-filter">
        {["UI/UX", "Web App", "Next JS", "React JS", "All"].map(
          (item, index) => (
            <div
              key={index}
              onClick={() => handWorkFIlter(item)}
              className={`app__work-filter-item app__flex p-text ${
                activeFilter === item ? "item-active" : ""
              }`}
            >
              {item}
            </div>
          )
        )}
      </div>

      <motion.div
        className="app__work-portfolio"
        animate={animationCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
      >
        {filterWorks.map((work, index) => (
          <div className="app__work-item app__flex" key={`work${index}`}>
            <div className="app__work-img app__flex">
              <img src={urlFor(work.imgUrl)} alt="name" /> 
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex"
              >
                {work.projectLink && (
                  <a href={work.projectLink}>
                    <motion.div
                      whileHover={{ scale: [1, 0.9] }}
                      whileInView={{ scale: [0, 1] }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="app__flex"
                    >
                      <AiFillEye />
                    </motion.div>
                  </a>
                )}
                {work.codeLink && (
                  <a href={work.codeLink}>
                    <motion.div
                      whileHover={{ scale: [1, 0.9] }}
                      whileInView={{ scale: [0, 1] }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="app__flex"
                    >
                      <AiFillGithub />
                    </motion.div>
                  </a>
                )}
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>
                {work.description}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(Work, "work");
