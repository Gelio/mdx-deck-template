import React, { Component } from 'react';
import { updaters, withDeck } from 'mdx-deck';
import styled from 'styled-components';

const transitionDuration = 400;

const VideoWrapper = styled.div`
  display: grid;
`;

const Centered = styled.div`
  align-self: center;
  justify-self: center;
  grid-row: 1/2;
  grid-column: 1/2;
`;

const CenteredOnTop = styled(Centered)`
  z-index: 1;
`;

const Link = styled.a`
  &:hover {
    cursor: pointer;
  }
`;

const CenteredPlayIcon = ({ onClick }) => (
  <CenteredOnTop>
    <Link onClick={onClick}>
      <img src="https://image.flaticon.com/icons/svg/26/26025.svg" alt="Play" />
    </Link>
  </CenteredOnTop>
);

/**
 * The PostponedVideo component displays a paused video and plays it after trying to switch
 * to the next slide.
 */
class PostponedVideo extends Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
    this.state = {
      isPlaying: false,
    };

    const { update, index } = props.deck;
    const { setSteps } = updaters;
    update(setSteps(index, 1));
  }

  get _video() {
    return this.videoRef.current;
  }

  componentDidMount() {
    this._resetVideo();

    if (this.props.deck.active) {
      this._updateVideoBasedOnStep();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deck.active && !this.props.deck.active) {
      setTimeout(this._resetVideo, transitionDuration);
    }

    if (prevProps.deck.step !== this.props.deck.step) {
      this._updateVideoBasedOnStep();
    }
  }

  render() {
    const { isPlaying } = this.state;

    return (
      <VideoWrapper>
        <Centered>
          <video ref={this.videoRef} {...this.props} />
        </Centered>
        {isPlaying || <CenteredPlayIcon onClick={this._startPlaying} />}
      </VideoWrapper>
    );
  }

  _updateVideoBasedOnStep() {
    const { step, active } = this.props.deck;

    if (step === 0) {
      this._video.pause();
      this.setState({ isPlaying: false });
    } else if (step === 1 && active) {
      this._startPlaying();
    }
  }

  _startPlaying = () => {
    this._video.play();
    this.setState({ isPlaying: true });
  };

  _resetVideo = () => {
    this._video.load();
  };
}

export default withDeck(PostponedVideo);
