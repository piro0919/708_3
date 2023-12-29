"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import Lightbox from "react-18-image-lightbox";
import ImageGallery from "react-image-gallery";
import { useWindowSize } from "usehooks-ts";
import styles from "./style.module.scss";

type Image = {
  url: string;
};

type Work = {
  description: string;
  images: Image[];
  title: string;
};

export type WorksProps = {
  works: Work[];
};

export default function Works({ works }: WorksProps): JSX.Element {
  const { width: windowWidth } = useWindowSize();
  const [workIndex, setWorkIndex] = useState<number>();
  const [photoIndex, setPhotoIndex] = useState<number>();
  const columns = useMemo(() => Math.ceil(windowWidth / 720), [windowWidth]);
  const items = useMemo(
    () =>
      works.map(({ description, images, title }, index) => (
        <motion.li
          animate={{
            clipPath: "inset(0% 0% 0% 0%)",
          }}
          className={`${styles.item} pattern-cross-dots-md`}
          initial={{ clipPath: "inset(0% 100% 100% 0%)" }}
          key={title}
          style={{ width: `calc((100% - 8px * ${columns - 1}) / ${columns})` }}
          transition={{
            delay: 0.1 * index,
            duration: 0.75,
            ease: "circInOut",
          }}
        >
          <div className={styles.itemInner}>
            <ImageGallery
              items={images.map(({ url }, imageIndex) => ({
                original: url,
                renderItem: ({ original }) => (
                  <div
                    className={styles.imageBlock}
                    onClick={() => {
                      setWorkIndex(index);
                      setPhotoIndex(imageIndex);
                    }}
                  >
                    <Image alt="" fill={true} quality={100} src={original} />
                  </div>
                ),
                renderThumbInner: ({ original }) => (
                  <div className={styles.imageBlock}>
                    <Image alt="" fill={true} quality={100} src={original} />
                  </div>
                ),
                thumbnail: url,
              }))}
              lazyLoad={true}
              showFullscreenButton={false}
              showPlayButton={false}
            />
            <hr className={styles.hr} />
            <div className={styles.textsBlock}>
              <h3 className={styles.h3}>{title}</h3>
              <p>{description}</p>
            </div>
          </div>
        </motion.li>
      )),
    [columns, works],
  );

  return (
    <>
      <h2 className={styles.h2}>WORKS</h2>
      <ul className={styles.list}>{items}</ul>
      {typeof workIndex === "number" && typeof photoIndex === "number" ? (
        <Lightbox
          mainSrc={works[workIndex].images[photoIndex].url}
          nextSrc={
            works[workIndex].images[
              (photoIndex + 1) % works[workIndex].images.length
            ].url
          }
          onCloseRequest={() => {
            setWorkIndex(undefined);
            setPhotoIndex(undefined);
          }}
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % works[workIndex].images.length)
          }
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + works[workIndex].images.length - 1) %
                works[workIndex].images.length,
            )
          }
          prevSrc={
            works[workIndex].images[
              (photoIndex + works[workIndex].images.length - 1) %
                works[workIndex].images.length
            ].url
          }
        />
      ) : null}
    </>
  );
}
