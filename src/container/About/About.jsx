import React from "react";
import "./About.scss";
import { motion } from "framer-motion";
import { AppWrap } from "../../wrapper";
import { useState } from "react";
import { urlFor, client } from "../../client";
import { useEffect } from "react";
const About = () => {
  const [abouts, setAbouts] = useState([]);
  useEffect(() => {
    const query = '*[_type == "abouts"]';

    client.fetch(query).then((data) => setAbouts(data));
  }, []);

  return (
    <>
      <h2 className="head-text">
        i know that <span>Good Development</span>
        <br /> means <span>Good Business</span>
      </h2>
      <div className="app__profiles">
        {abouts.map((item, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profile-item"
            key={`${index}-item`}
          >
            <img src={urlFor(item.imgUrl)} alt={item.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {item.title}
            </h2>
            <p className="p-text" style={{ marginTop: 10 }}>
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(About, "about");
