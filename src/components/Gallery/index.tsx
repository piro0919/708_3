"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import Lightbox from "react-18-image-lightbox";
import { useCounter } from "usehooks-ts";
import styles from "./style.module.scss";
import useWindowWidth from "@/hooks/useWindowWidth";

type Image = {
  url: string;
};

export type GalleryProps = {
  images: Image[];
};

export default function Gallery({ images }: GalleryProps): JSX.Element {
  const { count, increment } = useCounter(0);
  const [photoIndex, setPhotoIndex] = useState<number>();
  const { width } = useWindowWidth();
  const columns = useMemo(() => Math.ceil(width / 360), [width]);
  const items = useMemo(
    () =>
      images.map(({ url }, index) => (
        <li key={url}>
          <motion.div
            animate={{ scale: count === images.length ? 1 : 0 }}
            className={styles.imageBlock}
            initial={{ scale: 0 }}
            onClick={() => {
              setPhotoIndex(index);
            }}
            transition={{
              delay: 0.1 * index,
              duration: 0.5,
              ease: "backOut",
            }}
          >
            <Image
              alt=""
              fill={true}
              onLoad={increment}
              quality={100}
              src={url}
            />
          </motion.div>
        </li>
      )),
    [count, images, increment],
  );

  return (
    <>
      <h2 className={styles.h2}>GALLERY</h2>
      <ul
        className={styles.list}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {items}
      </ul>
      {typeof photoIndex === "number" ? (
        <Lightbox
          mainSrc={images[photoIndex].url}
          nextSrc={images[(photoIndex + 1) % images.length].url}
          onCloseRequest={() => {
            setPhotoIndex(undefined);
          }}
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          prevSrc={images[(photoIndex + images.length - 1) % images.length].url}
        />
      ) : null}
    </>
  );
}
