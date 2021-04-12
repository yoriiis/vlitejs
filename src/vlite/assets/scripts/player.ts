// Import SVG icons
import { formatVideoTime, isTouch } from 'shared/utils/utils'
import { Options, playerParameters, configEvent } from 'shared/assets/interfaces/interfaces'
import ControlBar from '../../components/control-bar/assets/scripts/control-bar'

/**
 * Vlitejs Player
 * @module Vlitejs/Player
 */
export default class Player {
	Vlitejs: any
	type: string
	media: HTMLAudioElement | HTMLVideoElement
	options: Options
	isFullScreen: Boolean
	isMuted: Boolean
	isPaused: null | Boolean
	delayAutoHide: number
	controlBar: any
	customEvents: Array<configEvent>
	isTouch: Boolean
	elements: {
		container: HTMLElement
		bigPlay: HTMLElement | null
		poster: HTMLElement | null
		controlBar: HTMLElement | null
		playPause: HTMLElement | null
		progressBar: HTMLInputElement | null
		currentTime: HTMLElement | null
		duration: HTMLElement | null
		volume: HTMLElement | null
		fullscreen: HTMLElement | null
	}

	/**
	 * @constructor
	 * @param {Object} options
	 * @param {Class} options.Vlitejs Vlitejs instance
	 * @param {HTMLElement} options.type Player type (video|audio)
	 */
	constructor({ Vlitejs, type }: playerParameters) {
		this.Vlitejs = Vlitejs
		this.type = type
		this.media = Vlitejs.media
		this.options = Vlitejs.options

		this.elements = {
			container: Vlitejs.container,
			bigPlay: Vlitejs.container.querySelector('.v-bigPlay'),
			poster: Vlitejs.container.querySelector('.v-poster'),
			controlBar: null,
			playPause: null,
			progressBar: null,
			currentTime: null,
			duration: null,
			volume: null,
			fullscreen: null
		}

		this.isFullScreen = false
		this.isMuted = this.options.muted
		this.isPaused = null
		this.delayAutoHide = 3000
		this.customEvents = []
		this.isTouch = isTouch()

		this.controlBar = new ControlBar({
			player: this,
			type
		})
	}

	/**
	 * Build the player
	 */
	build() {
		this.options.controls && this.controlBar.init()
		this.init()
	}

	/**
	 * init
	 * Extends by the provider
	 */
	init() {
		throw new Error('You have to implement the function "init".')
	}

	/**
	 * waitUntilVideoIsReady
	 * Extends by the provider
	 */
	waitUntilVideoIsReady() {
		throw new Error('You have to implement the function "waitUntilVideoIsReady".')
	}

	/**
	 * getInstance
	 * Extends by the provider
	 */
	getInstance() {
		throw new Error('You have to implement the function "getInstance".')
	}

	/**
	 * getCurrentTime
	 * Extends by the provider
	 */
	getCurrentTime(): Promise<number> {
		throw new Error('You have to implement the function "getCurrentTime".')
	}

	/**
	 * methodSeekTo
	 * Extends by the provider
	 */
	methodSeekTo(newTime: number) {
		throw new Error('You have to implement the function "methodSeekTo".')
	}

	/**
	 * getDuration
	 * Extends by the provider
	 */
	getDuration(): Promise<number> {
		throw new Error('You have to implement the function "getDuration".')
	}

	/**
	 * methodPlay
	 * Extends by the provider
	 */
	methodPlay() {
		throw new Error('You have to implement the function "methodPlay".')
	}

	/**
	 * methodPause
	 * Extends by the provider
	 */
	methodPause() {
		throw new Error('You have to implement the function "methodPause".')
	}

	/**
	 * methodSetVolume
	 * Extends by the provider
	 */
	methodSetVolume(newVolume: number) {
		throw new Error('You have to implement the function "methodSetVolume".')
	}

	/**
	 * methodGetVolume
	 * Extends by the provider
	 */
	methodGetVolume(): Promise<number> {
		throw new Error('You have to implement the function "methodGetVolume".')
	}

	/**
	 * methodMute
	 * Extends by the provider
	 */
	methodMute() {
		throw new Error('You have to implement the function "methodMute".')
	}

	/**
	 * methodUnMute
	 * Extends by the provider
	 */
	methodUnMute() {
		throw new Error('You have to implement the function "methodUnMute".')
	}

	/**
	 * On the player is ready
	 */
	onPlayerReady() {
		// If player has autoplay option, play now
		if (this.options.autoplay) {
			// Autoplay on video is authorize only when the media element is muted
			!this.media.muted && this.mute()

			this.play()
		}

		this.loading(false)
		this.options.controls && this.controlBar.onPlayerReady()
		this.Vlitejs.onReady instanceof Function && this.Vlitejs.onReady.call(this, this)
	}

	/**
	 * Add media action listeners on the container
	 * @param {String} type Event type
	 * @param {EventListener} listener Event listener
	 */
	on(type: string, listener: EventListener) {
		if (listener instanceof Function) {
			this.customEvents.push({ type, listener })
			this.elements.container.addEventListener(type, listener)
		}
	}

	/**
	 * Dispatch custom event on the container
	 * @param {String} type Event type
	 */
	dispatchEvent(type: string) {
		this.elements.container.dispatchEvent(new CustomEvent(type))
	}

	/**
	 * Loading bridge between the player and vlite
	 * @param {Boolean} status Loading status
	 */
	loading(status: Boolean) {
		this.Vlitejs.loading(status)
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

					if (this.elements.progressBar) {
						const width = (currentTime * 100) / duration
						this.elements.progressBar.value = `${width}`
						this.elements.progressBar.style.setProperty('--value', `${width}%`)
						this.elements.progressBar.setAttribute('aria-valuenow', `${Math.round(seconds)}`)
					}

					if (this.elements.currentTime) {
						this.elements.currentTime.innerHTML = formatVideoTime(currentTime)
					}

					this.dispatchEvent('timeupdate')
				}
			)
		}
	}

	/**
	 * On video ended
	 */
	onVideoEnded() {
		if (this.options.loop) {
			this.play()
		} else {
			this.elements.container.classList.replace('v-playing', 'v-paused')
			this.elements.container.classList.add('v-firstStart')
		}

		if (this.options.poster && this.elements.poster) {
			this.elements.poster.classList.add('v-active')
		}

		if (this.elements.progressBar) {
			this.elements.progressBar.value = '0'
			this.elements.progressBar.style.setProperty('--value', '0%')
			this.elements.progressBar.removeAttribute('aria-valuenow')
		}

		if (this.elements.currentTime) {
			this.elements.currentTime.innerHTML = '00:00'
		}

		this.dispatchEvent('ended')
	}

	/**
	 * Play the media element
	 */
	play() {
		if (this.elements.container.classList.contains('v-firstStart')) {
			this.elements.container.classList.remove('v-firstStart')

			if (this.type === 'video' && this.elements.poster) {
				this.elements.poster.classList.remove('v-active')
			}
		}

		this.methodPlay()
		this.isPaused = false
		this.elements.container.classList.replace('v-paused', 'v-playing')

		if (this.elements.playPause) {
			this.elements.playPause.setAttribute('aria-label', 'Pause')
		}

		if (this.type === 'video' && this.elements.bigPlay) {
			this.elements.bigPlay.setAttribute('aria-label', 'Pause')
		}
		this.afterPlayPause()

		this.dispatchEvent('play')
	}

	/**
	 * Pause the media element
	 */
	pause() {
		this.methodPause()
		this.isPaused = true
		this.elements.container.classList.replace('v-playing', 'v-paused')

		if (this.elements.playPause) {
			this.elements.playPause.setAttribute('aria-label', 'Play')
		}

		if (this.type === 'video' && this.elements.bigPlay) {
			this.elements.bigPlay.setAttribute('aria-label', 'Play')
		}
		this.afterPlayPause()

		this.dispatchEvent('pause')
	}

	/**
	 * Callback function after the play|pause
	 */
	afterPlayPause() {
		if (this.Vlitejs.autoHideGranted) {
			this.Vlitejs.stopAutoHideTimer()
			!this.isPaused && this.Vlitejs.startAutoHideTimer()
		}
	}

	/**
	 * Set player volume
	 * @param {Number} volume New volume
	 */
	setVolume(volume: number) {
		if (volume > 1) {
			volume = 1
		} else if (volume <= 0) {
			volume = 0
			this.isMuted = true
			if (this.elements.volume) {
				this.elements.volume.classList.add('v-controlPressed')
			}
		} else {
			this.isMuted = false
			if (this.elements.volume) {
				this.elements.volume.classList.remove('v-controlPressed')
			}
		}

		this.methodSetVolume(volume)
		this.dispatchEvent('volumechange')
	}

	/**
	 * Get player volume
	 * @returns {Promise<Number>} Player volume
	 */
	getVolume(): Promise<number> {
		return new window.Promise((resolve) => {
			this.methodGetVolume().then((volume: number) => {
				resolve(volume)
			})
		})
	}

	/**
	 * Mute the volume on the media element
	 */
	mute() {
		this.methodMute()
		this.isMuted = true

		if (this.elements.volume) {
			this.elements.volume.classList.add('v-controlPressed')
		}

		this.dispatchEvent('volumechange')
	}

	/**
	 * Unmute the volume on the media element
	 */
	unMute() {
		this.methodUnMute()
		this.isMuted = false

		if (this.elements.volume) {
			this.elements.volume.classList.remove('v-controlPressed')
		}

		this.dispatchEvent('volumechange')
	}

	/**
	 * Update the current time of the media element
	 * @param {Number} newTime New current time of the media element
	 */
	seekTo(newTime: number) {
		this.methodSeekTo(newTime)
	}

	/**
	 * Request the fullscreen
	 */
	requestFullscreen() {
		const { requestFn } = this.Vlitejs.supportFullScreen

		// @ts-ignore: Object is possibly 'null'.
		if (this.media[requestFn]) {
			// Request fullscreen on parentNode player, to display custom controls
			// @ts-ignore: Object is possibly 'null'.
			this.elements.container[requestFn]()
			this.isFullScreen = true
			this.elements.container.classList.add('v-fullscreenButton-display')

			if (this.elements.fullscreen) {
				this.elements.fullscreen.classList.add('v-controlPressed')
			}

			this.dispatchEvent('enterfullscreen')
		}
	}

	/**
	 * Exit the fullscreen
	 * @param {Object} options
	 * @param {Boolean} options.escKey The exit is trigger by the esk key
	 */
	exitFullscreen({ escKey = false }: { escKey?: Boolean } = {}) {
		const { cancelFn } = this.Vlitejs.supportFullScreen

		if (document[cancelFn]) {
			// @ts-ignore: Object is possibly 'null'.
			!escKey && document[cancelFn]()
			this.isFullScreen = false

			this.elements.container.classList.remove('v-fullscreenButton-display')

			if (this.elements.fullscreen) {
				this.elements.fullscreen.classList.remove('v-controlPressed')
			}

			this.dispatchEvent('exitfullscreen')
		}
	}

	/**
	 * Destroy the player
	 * Remove event listeners, player instance and DOM
	 */
	destroy() {
		this.options.controls && this.controlBar && this.controlBar.removeEvents()
		this.customEvents.forEach((event) => {
			this.elements.container.removeEventListener(event.type, event.listener)
		})
		this.elements.container.remove()
	}
}