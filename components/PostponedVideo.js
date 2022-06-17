import React, { useEffect, useRef } from "react";
import { useSteps, useDeck } from "mdx-deck";
import styled from "@emotion/styled";

const VideoWrapper = styled("div")({
  display: "grid",
});

const Centered = styled("div")({
  alignSelf: "center",
  justifySelf: "center",
  gridRow: "1/2",
  gridColumn: "1/2",
});

const CenteredOnTop = styled(Centered)({
  zIndex: 1,
});

const Link = styled("a")({
  "&:hover": {
    cursor: "pointer",
  },
});

const ImageWithShadow = styled("img")({
  filter: "drop-shadow(2px 4px 6px white)",
  width: "150px",
  maxWidth: "100%",
});

const CenteredPlayIcon = ({ onClick }) => (
  <CenteredOnTop>
    <Link onClick={onClick}>
      <ImageWithShadow
        src="https://cdn-icons-png.flaticon.com/512/0/375.png"
        alt="Play"
      />
    </Link>
  </CenteredOnTop>
);

const steps = {
  paused: 0,
  playing: 1,
};

const maxStepIndex = Object.keys(steps).length - 1;

/**
 * Displays a paused video and plays it after trying to switch to the next
 * slide.
 *
 * @param {import("react").VideoHTMLAttributes<HTMLVideoElement>} props
 */
export const PostponedVideo = (props) => {
  /** @type {number} */
  const step = useSteps(maxStepIndex);
  const { setStep } = useDeck();
  /** @type {import('react').RefObject<HTMLVideoElement | null>} */
  const videoRef = useRef(null);

  useEffect(() => {
    setStep(steps.paused);
  }, [setStep]);

  useEffect(() => {
    const videoPaused = videoRef.current.paused;

    switch (step) {
      case steps.playing:
        if (videoPaused) {
          videoRef.current.play();
        }
        break;

      case steps.paused:
        if (!videoPaused) {
          videoRef.current.pause();
        }
        break;

      default:
        throw new Error(`Unexpected step number ${step}`);
    }
  }, [step]);

  useEffect(() => {
    const setStepPlaying = () => setStep(steps.playing);
    const setStepPaused = () => setStep(steps.paused);
    const video = videoRef.current;

    // NOTE: synchronizes the presentation step state if someone uses video
    // controls to play/pause the video.
    video.addEventListener("playing", setStepPlaying);
    video.addEventListener("pause", setStepPaused);

    return () => {
      video.removeEventListener("playing", setStepPlaying);
      video.removeEventListener("pause", setStepPaused);
    };
  });

  return (
    <VideoWrapper>
      <Centered>
        <video ref={videoRef} {...props} />
      </Centered>

      {step === steps.paused && (
        <CenteredPlayIcon onClick={() => setStep(steps.playing)} />
      )}
    </VideoWrapper>
  );
};
