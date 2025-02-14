import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export interface RotatingTextProps extends Omit<
  React.ComponentPropsWithoutRef<typeof motion.span>,
  "children" | "transition" | "initial" | "animate" | "exit"
> {
  texts: string[];
  transition?: Transition;
  initial?: Record<string, string | number>;
  animate?: Record<string, string | number>;
  exit?: Record<string, string | number>;
  animatePresenceMode?: "sync" | "wait";
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "characters" | "words" | "lines" | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      transition = { type: "spring", damping: 25, stiffness: 300 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-120%", opacity: 0 },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2000,
      // staggerDuration = 0,
      // staggerFrom = "first",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      // elementLevelClassName,
      ...rest
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

    const splitIntoCharacters = (text: string): string[] => {
      if (typeof Intl !== "undefined" && Intl.Segmenter) {
        const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
        return Array.from(segmenter.segment(text), (segment) => segment.segment);
      }
      return Array.from(text);
    };

    const elements = useMemo(() => {
      const currentText = texts[currentTextIndex];
      if (splitBy === "characters") {
        const words = currentText.split(" ");
        return words.map((word, i) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i !== words.length - 1,
        }));
      }
      if (splitBy === "words") {
        return currentText.split(" ").map((word, i, arr) => ({
          characters: [word],
          needsSpace: i !== arr.length - 1,
        }));
      }
      if (splitBy === "lines") {
        return currentText.split("\n").map((line, i, arr) => ({
          characters: [line],
          needsSpace: i !== arr.length - 1,
        }));
      }

      return currentText.split(splitBy).map((part, i, arr) => ({
        characters: [part],
        needsSpace: i !== arr.length - 1,
      }));
    }, [texts, currentTextIndex, splitBy]);

    // const getStaggerDelay = useCallback(
    //   (index: number, totalChars: number): number => {
    //     if (staggerFrom === "first") return index * staggerDuration;
    //     if (staggerFrom === "last") return (totalChars - 1 - index) * staggerDuration;
    //     if (staggerFrom === "center") {
    //       const center = Math.floor(totalChars / 2);
    //       return Math.abs(center - index) * staggerDuration;
    //     }
    //     if (staggerFrom === "random") {
    //       return Math.floor(Math.random() * totalChars) * staggerDuration;
    //     }
    //     return Math.abs((staggerFrom as number) - index) * staggerDuration;
    //   },
    //   [staggerFrom, staggerDuration]
    // );

    const handleIndexChange = useCallback((newIndex: number) => {
      setCurrentTextIndex(newIndex);
      onNext?.(newIndex);
    }, [onNext]);

    const next = useCallback(() => {
      const nextIndex = currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;
      handleIndexChange(nextIndex);
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
      const prevIndex = currentTextIndex === 0 ? (loop ? texts.length - 1 : 0) : currentTextIndex - 1;
      handleIndexChange(prevIndex);
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback((index: number) => {
      handleIndexChange(Math.max(0, Math.min(index, texts.length - 1)));
    }, [texts.length, handleIndexChange]);

    const reset = useCallback(() => {
      handleIndexChange(0);
    }, [handleIndexChange]);

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [next, previous, jumpTo, reset]);

    useEffect(() => {
      if (!auto) return;
      const intervalId = setInterval(next, rotationInterval);
      return () => clearInterval(intervalId);
    }, [next, rotationInterval, auto]);

    return (
      <motion.span className={cn("flex flex-wrap whitespace-pre-wrap relative", mainClassName)} {...rest}>
        <span className="sr-only">{texts[currentTextIndex]}</span>
        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
          <motion.div key={currentTextIndex} className="flex flex-wrap whitespace-pre-wrap relative">
            {elements.map((wordObj, wordIndex) => (
              <span key={wordIndex} className={cn("inline-flex", splitLevelClassName)}>
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span key={charIndex} initial={initial} animate={animate} exit={exit} transition={transition}>
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.span>
    );
  }
);

RotatingText.displayName = "RotatingText";
export default RotatingText;
