import { createElement } from 'jsx-dom'
import svgPlay from 'shared/assets/svgs/play.svg'
import svgPause from 'shared/assets/svgs/pause.svg'
import svgVolumeHigh from 'shared/assets/svgs/volume-high.svg'
import svgVolumeMute from 'shared/assets/svgs/volume-mute.svg'
import svgFullscreen from 'shared/assets/svgs/fullscreen.svg'
import svgFullscreenExit from 'shared/assets/svgs/fullscreen-exit.svg'
import { capitalized } from 'shared/utils/utils'

export default function ({ options = {}, isMuted, mode }) {
	return (
		<div className={`v-controlBar v-style${capitalized(mode)}`}>
			{options.playPause && (
				<button className="v-playPauseButton v-controlButton" aria-label="Play">
					<span className="v-controlButtonIcon v-iconPlay" innerHTML={svgPlay}></span>
					<span className="v-controlButtonIcon v-iconPause" innerHTML={svgPause}></span>
				</button>
			)}
			{options.time && (
				<div className="v-time">
					<span className="v-currentTime">00:00</span>&nbsp;/&nbsp;
					<span className="v-duration"></span>
				</div>
			)}
			{options.progressBar && (
				<input
					type="range"
					className="v-progressBar"
					min="0"
					max="100"
					step="0.01"
					value="0"
					orient="horizontal"
					aria-label="Seek"
					aria-valuemin="0"
				/>
			)}
			{options.volume && (
				<button className={`v-volumeButton v-controlButton${isMuted ? ' v-pressed' : ''}`}>
					<span className="v-controlButtonIcon v-iconVolumeHigh" innerHTML={svgVolumeHigh}></span>
					<span className="v-controlButtonIcon v-iconVolumeMute" innerHTML={svgVolumeMute}></span>
				</button>
			)}
			{options.fullscreen && (
				<button className="v-fullscreenButton v-controlButton" aria-label="Enter fullscreen">
					<span className="v-controlButtonIcon v-iconFullscreen" innerHTML={svgFullscreen}></span>
					<span className="v-controlButtonIcon v-iconShrink" innerHTML={svgFullscreenExit}></span>
				</button>
			)}
		</div>
	)
}