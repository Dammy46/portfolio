import React from 'react';
import { NavigationDots, SocialMediaIcon } from '../components';
const AppWrap = (Component, idName, className) =>
  function HOC() {
    return (
      <div id={idName} className={`app__container`}>
        <SocialMediaIcon />

        <div className="app__wrapper app__flex">
          <Component />

          <div className="copyright">
            <p className="p-text">&copy; 2022 Abdulzobur</p>
            <p className="p-text">All rights reserved</p>
          </div>
        </div>
        <NavigationDots active={idName} />
      </div>
    );
  };

export default AppWrap;
