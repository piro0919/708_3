"use client";
import { motion } from "framer-motion";
import { useGifController } from "gif-tsx";
import { useRef } from "react";
import styles from "./style.module.scss";

export type FubumikujiProps = {
  year: number;
};

export default function Fubumikuji({ year }: FubumikujiProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { canvasProps, ...controller } = useGifController(
    `/fubumikuji${year}.gif`,
    canvasRef,
    true,
  );

  // useEffect(() => {
  //   if (controller.state !== "resolved" || controller.playing) {
  //     return;
  //   }

  //   console.log(controller.frameIndex);
  // }, [controller]);

  return (
    <>
      <h2 className={styles.h2}>{`フブみくじ${year}`}</h2>
      <div className={styles.wrapper}>
        <motion.div
          animate={{
            clipPath: `inset(0% ${controller.state === "resolved" ? 0 : 100}% ${
              controller.state === "resolved" ? 0 : 100
            }% 0%)`,
          }}
          className={styles.fubumikujiWrapper}
          initial={{ clipPath: "inset(0% 100% 100% 0%)" }}
          transition={{
            duration: 0.75,
            ease: "circInOut",
          }}
        >
          <div className={`${styles.fubumikujiBlock} pattern-cross-dots-md`}>
            <div className={styles.fubumikujiInner}>
              {controller.state === "resolved" ? (
                <>
                  <motion.div
                    animate={{ scale: 1 }}
                    className={styles.canvasBlock}
                    initial={{ scale: 0 }}
                    onClick={
                      controller.playing ? controller.pause : controller.play
                    }
                    transition={{
                      delay: 0.5,
                      duration: 0.5,
                      ease: "backOut",
                    }}
                  >
                    <canvas
                      {...canvasProps}
                      className={styles.canvas}
                      ref={canvasRef}
                    />
                  </motion.div>
                  <div className={styles.fubumikujiFooter}>
                    {controller.playing ? (
                      <button
                        className={styles.button}
                        onClick={controller.pause}
                      >
                        おみくじをひく
                      </button>
                    ) : (
                      <button
                        className={styles.button}
                        onClick={controller.play}
                      >
                        おみくじをふる
                      </button>
                    )}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
