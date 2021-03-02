import React, { useState } from 'react';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import Background from 'components/body/Background';
import Video from 'components/body/Video';

function GameItem({ game }) {

    const [hover, setHover] = useState(false);

    const {
        id,
        name,
        slug,
        backgroundImage,
        metacritic,
        clip,
        parentPlatforms
    } = game;

    const hasVideo = !!clip && !!clip.clip;
    const showVideo = hasVideo && hover;

    const handleMouseEnter = e => {
        setHover(true);
    };

    const handleMouseLeave = e => {
        setHover(false);
    };
    return (
        <div className=""
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Background backgroundImage={backgroundImage} hasVideo={hasVideo}>
                {hasVideo && <PlayArrowIcon className="icon icon--play" style={{ color: "#EEEEEE" }} />}
            </Background>
            {showVideo && (
                <Video
                    src={clip.clip}
                    videoId={clip.video}
                />
            )}
        </div>
    );
}

export default React.memo(GameItem);