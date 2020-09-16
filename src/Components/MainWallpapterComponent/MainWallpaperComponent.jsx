import React from 'react';
import styles from './MainWallpaperComponent.module.scss';
import OwlCarousel from 'react-owl-carousel';
import MainVideoPortalContainer from '../../Containers/MainVideoPortalContainer';
import { useState, useCallback } from 'react';

const images = [
  { id: 1, title: '뮤턴트', src: 'images/wallpaper/Mutants_1920774.jpg' },
  { id: 2, title: '테넷', src: 'images/wallpaper/Tenet_1920774.jpg' },
  { id: 3, title: '아웃포스트', src: 'images/wallpaper/Outpost_1920774.jpg' },
  {
    id: 4,
    title: '기기괴괴성형수',
    src: 'images/wallpaper/BeautyWater_1920774.jpg',
  },
];

function MainWallpaperComponent() {
  const [modal, setModal] = useState({
    clickEvent: false,
    videoId: 0,
  });

  const click = useCallback((e) => {
    const index = e.target.id;
    setModal((state) => ({
      ...state,
      clickEvent: !state.clickEvent,
      videoId: index,
    }));
  }, []);

  return (
    <section className={styles['wallpaper']}>
      <OwlCarousel
        className="top-visual-box"
        items={1}
        mergeFit
        loop
        nav
        autoplay
        autoplayTimeout={3000}
        autoplaySpeed={500}
      >
        {images.map((images) => (
          <a className={styles['images']}>
            <img
              src={images.src}
              alt={images.title}
              id={images.id}
              onClick={click}
            />
            <button>
              <img
                onClick={click}
                className={styles['play-button']}
                src="images\icon\btn_main_visual_play.png"
                alt="play-button"
              />
            </button>
            {modal.clickEvent && (
              <MainVideoPortalContainer
                id={modal.videoId}
                setModal={setModal}
              />
            )}
          </a>
        ))}
      </OwlCarousel>
      <div className={styles['control']}></div>
    </section>
  );
}

export default React.memo(MainWallpaperComponent);
