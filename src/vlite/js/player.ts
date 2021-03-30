// Import SVG icons
import { formatVideoTime } from 'shared/utils/utils'
import { Options } from 'shared/assets/interfaces/interfaces'

/**
 * vlitejs Player
 * @module vlitejs/Player
 */
export default class Player {
	element: HTMLAudioElement | HTMLVideoElement
	container: HTMLElement
	options: Options
	onCallbackReady: Function
	vliteInstance: any
	progressBarIsMoving: Boolean
	isFullScreen: Boolean
	isPaused: null | Boolean
	delayAutoHide: number
	controlBar!: any

	/**
	 * Instanciate the constructor
	 * @constructor
	 * @param {Object} options
	 * @param {HTMLElement} options.element Player HTML element
	 * @param {HTMLElement} options.container Player HTML container
	 * @param {Function} options.onCallbackReady Player on ready function
	 * @param {Class} options.vliteInstance vlitejs instance
	 * @param {Object} options Player options
	 */
	constructor({
		element,
		container,
		options,
		onCallbackReady,
		vliteInstance
	}: {
		element: HTMLAudioElement | HTMLVideoElement
		container: HTMLElement
		options: Options
		onCallbackReady: Function
		vliteInstance: any
	}) {
		this.element = element
		this.container = container as HTMLElement
		this.options = options
		this.onCallbackReady = onCallbackReady
		this.vliteInstance = vliteInstance

		this.progressBarIsMoving = false
		this.isFullScreen = false
		this.isPaused = null
		this.delayAutoHide = 3000
	}

	init() {
		throw new Error('You have to implement the function "init".')
	}

	waitUntilVideoIsReady() {
		throw new Error('You have to implement the function "waitUntilVideoIsReady".')
	}

	getInstance() {
		throw new Error('You have to implement the function "getInstance".')
	}

	getCurrentTime(): Promise<number> {
		throw new Error('You have to implement the function "getCurrentTime".')
	}

	setCurrentTime(newTime: number) {
		throw new Error('You have to implement the function "setCurrentTime".')
	}

	getDuration(): Promise<number> {
		throw new Error('You have to implement the function "getDuration".')
	}

	methodPlay() {
		throw new Error('You have to implement the function "methodPlay".')
	}

	methodPause() {
		throw new Error('You have to implement the function "methodPause".')
	}

	methodMute() {
		throw new Error('You have to implement the function "methodMute".')
	}

	methodUnMute() {
		throw new Error('You have to implement the function "methodUnMute".')
	}

	/**
	 * On the player is ready
	 */
	onPlayerReady() {
		this.onCallbackReady(this)

		// If player has autoplay option, play now
		if (this.options.autoplay) {
			// Autoplay on video is authorize only when the media element is muted
			!this.element.muted && this.mute()

			this.play()
		}
	}

	/**
	 * On duration change
	 */
	onDurationChange() {
		if (this.options.time) {
			this.getDuration().then((duration: number) => {
				const durationElement = this.container.querySelector('.v-duration')
				if (durationElement) {
					durationElement.innerHTML = formatVideoTime(duration)
				}

				this.container.dispatchEvent(new CustomEvent('durationchange'))
			})
		}
	}

	/**
	 * On time update
	 * Update current time displaying in the control bar
	 * Udpdate the progress bar
	 */
	onTimeUpdate() {
		if (this.options.time) {
			Promise.all([this.getCurrentTime(), this.getDuration()]).then(
				([seconds, duration]: [number, number]) => {
					const currentTime = Math.round(seconds)

					const progressBar = this.container.querySelector('.v-progressBar') as HTMLInputElement
					if (progressBar) {
						const width = (currentTime * 100) / duration
						if (!this.progressBarIsMoving) {
							progressBar.value = `${width}`
						}
						progressBar.style.setProperty('--value', `${width}%`)
					}

					const currentTimeElement = this.container.querySelector('.v-currentTime')
					if (currentTimeElement) {
						currentTimeElement.innerHTML = formatVideoTime(currentTime)
					}

					this.container.dispatchEvent(new CustomEvent('timeupdate'))
				}
			)
		}
	}

	/**
	 * On video ended
	 */
	onVideoEnded() {
		this.container.classList.replace('v-playing', 'v-paused')
		this.container.classList.add('v-firstStart')

		const poster = this.container.querySelector('.v-poster')
		if (this.options.poster && poster) {
			poster.classList.add('v-active')
		}

		const progressBar = this.container.querySelector('.v-progressBar') as HTMLInputElement
		if (progressBar) {
			progressBar.value = '0'
			progressBar.style.setProperty('--value', '0%')
			progressBar.removeAttribute('aria-valuenow')
		}

		const currentTime = this.container.querySelector('.v-currentTime')
		if (currentTime) {
			currentTime.innerHTML = '00:00'
		}

		this.container.dispatchEvent(new CustomEvent('ended'))
	}

	/**
	 * Play the media element
	 */
	play() {
		if (this.container.classList.contains('v-firstStart')) {
			this.container.classList.remove('v-firstStart')

			const poster = this.container.querySelector('.v-poster')
			if (this.vliteInstance.type === 'video' && poster) {
				poster.classList.remove('v-active')
			}

			this.vliteInstance.type === 'video' && this.container.focus()
		}

		this.methodPlay()
		this.isPaused = false
		this.container.classList.replace('v-paused', 'v-playing')

		const playPauseButton = this.container.querySelector('.v-playPauseButton')
		if (playPauseButton) {
			playPauseButton.setAttribute('aria-label', 'Pause')
		}

		const bigPlayButton = this.container.querySelector('.v-bigPlay')
		if (this.vliteInstance.type === 'video' && bigPlayButton) {
			bigPlayButton.setAttribute('aria-label', 'Pause')
		}
		this.afterPlayPause()

		this.container.dispatchEvent(new CustomEvent('play'))
	}

	/**
	 * Pause the media element
	 */
	pause() {
		this.methodPause()
		this.isPaused = true
		this.container.classList.replace('v-playing', 'v-paused')

		const playPauseButton = this.container.querySelector('.v-playPauseButton')
		if (playPauseButton) {
			playPauseButton.setAttribute('aria-label', 'Play')
		}

		const bigPlay = this.container.querySelector('.v-bigPlay')
		if (this.vliteInstance.type === 'video' && bigPlay) {
			bigPlay.setAttribute('aria-label', 'Play')
		}
		this.afterPlayPause()

		this.container.dispatchEvent(new CustomEvent('pause'))
	}

	/**
	 * Callback function after the play|pause
	 */
	afterPlayPause() {
		if (this.vliteInstance.autoHideGranted) {
			this.vliteInstance.stopAutoHideTimer()
			!this.isPaused && this.vliteInstance.startAutoHideTimer()
		}
	}

	/**
	 * Mute the volume on the media element
	 */
	mute() {
		this.methodMute()

		const volumeButton = this.container.querySelector('.v-volumeButton')
		if (volumeButton) {
			volumeButton.classList.add('v-pressed')
		}

		this.container.dispatchEvent(new CustomEvent('volumechange'))
	}

	/**
	 * Unmute the volume on the media element
	 */
	unMute() {
		this.methodUnMute()

		const volumeButton = this.container.querySelector('.v-volumeButton')
		if (volumeButton) {
			volumeButton.classList.remove('v-pressed')
		}

		this.container.dispatchEvent(new CustomEvent('volumechange'))
	}

	/**
	 * Update the current time of the media element
	 * @param {Number} newTime New current time of the media element
	 */
	seekTo(newTime: number) {
		this.setCurrentTime(newTime)
		this.container.dispatchEvent(new CustomEvent('seeked'))
	}

	/**
	 * Request the fullscreen
	 */
	requestFullscreen() {
		const { requestFn } = this.vliteInstance.supportFullScreen

		// @ts-ignore: Object is possibly 'null'.
		if (this.element[requestFn]) {
			// Request fullscreen on parentNode player, to display custom controls
			// @ts-ignore: Object is possibly 'null'.
			this.container[requestFn]()
			this.isFullScreen = true
			this.container.classList.add('v-fullscreenButton-display')

			const fullscreenButton = this.container.querySelector('.v-fullscreenButton')
			if (fullscreenButton) {
				fullscreenButton.classList.add('v-pressed')
			}

			this.container.dispatchEvent(new CustomEvent('enterfullscreen'))
		}
	}

	/**
	 * Exit the fullscreen
	 * @param {Object} options
	 * @param {Boolean} options.escKey The exit is trigger by the esk key
	 */
	exitFullscreen({ escKey = false }: { escKey?: Boolean } = {}) {
		const { cancelFn } = this.vliteInstance.supportFullScreen

		if (document[cancelFn]) {
			// @ts-ignore: Object is possibly 'null'.
			!escKey && document[cancelFn]()
			this.isFullScreen = false

			this.container.classList.remove('v-fullscreenButton-display')

			const fullscreenButton = this.container.querySelector('.v-fullscreenButton')
			if (fullscreenButton) {
				fullscreenButton.classList.remove('v-pressed')
			}

			this.container.dispatchEvent(new CustomEvent('exitfullscreen'))
		}
	}

	/**
	 * Destroy the player
	 * Remove event listeners, player instance and DOM
	 */
	destroy() {
		this.pause()
		this.options.controls && this.controlBar && this.controlBar.removeEvents()
		this.container.remove()
	}
}