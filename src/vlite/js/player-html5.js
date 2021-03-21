import Player from './player'

/**
 * vlitejs Player HTML5
 * @module vlitejs/Player/PlayerHtml5
 */
export default class PlayerHtml5 extends Player {
	type = 'html5'

	/**
	 * Instanciate the constructor
	 * @constructor
	 * @param {String|Object} selector CSS selector or query selector
	 * @param {Object} options Player options
	 * @param {Function} onReady Callback function executed when the player is ready
	 */
	constructor({ selector, options, onReady }) {
		// Init Player class
		super({
			selector,
			options,
			onReady
		})

		this.onPlayerReady = this.onPlayerReady.bind(this)
		this.updateDuration = this.updateDuration.bind(this)
		this.updateCurrentTime = this.updateCurrentTime.bind(this)
		this.onVideoEnded = this.onVideoEnded.bind(this)
		this.onPlaying = this.onPlaying.bind(this)
		this.onWaiting = this.onWaiting.bind(this)
		this.onSeeking = this.onSeeking.bind(this)
		this.onSeeked = this.onSeeked.bind(this)
	}

	init() {
		super.init()

		this.waitUntilVideoIsReady().then(this.onPlayerReady)

		!this.skinDisabled && this.addSpecificEvents()
	}

	/**
	 * Function executed when the player is ready
	 */
	onPlayerReady() {
		super.playerIsReady()
		this.updateDuration()
	}

	/**
	 * Wait until the video is ready
	 * @returns {Promise} Loading of the video with a Promise
	 */
	waitUntilVideoIsReady() {
		return new window.Promise((resolve, reject) => {
			// Check if the video is ready
			if (typeof this.player.duration === 'number' && isNaN(this.player.duration) === false) {
				resolve()
			} else {
				this.onDurationChange = () => {
					this.player.removeEventListener('durationchange', this.onDurationChange)
					this.player.removeEventListener('error', this.onError)

					resolve()
				}

				this.onError = (error) => {
					this.player.removeEventListener('error', this.onError)
					this.player.removeEventListener('durationchange', this.onDurationChange)

					reject(error)
				}

				// Listen error or durationchange events to detect when the video is ready
				this.player.addEventListener('durationchange', this.onDurationChange)
				this.player.addEventListener('error', this.onError)
			}
		})
	}

	/**
	 * Create event listeners
	 * All listeners are created on class properties to facilitate the deletion of events
	 */
	addSpecificEvents() {
		if (this.options.controls) {
			if (this.options.time) {
				// On durationchange event, update duration if value is different
				this.player.addEventListener('durationchange', this.updateDuration)
			}

			// On timeupdate event, update currentTime displaying in the control bar and the width of the progress bar
			this.player.addEventListener('timeupdate', this.updateCurrentTime)
		}

		// On ended event, show poster and reset progressBar and time
		this.player.addEventListener('ended', this.onVideoEnded)
		this.player.addEventListener('playing', this.onPlaying)
		this.player.addEventListener('waiting', this.onWaiting)
		this.player.addEventListener('seeking', this.onSeeking)
		this.player.addEventListener('seeked', this.onSeeked)
	}

	/**
	 * Get the player instance
	 * @returns {Object} Video element
	 */
	getInstance() {
		return this.player
	}

	/**
	 * Get the player current time
	 * @returns {Float|Integer} Current time of the video
	 */
	getCurrentTime() {
		return new window.Promise((resolve) => resolve(this.player.currentTime))
	}

	/**
	 * Set the new current time for the player
	 * @param {Float|Integer} Current time video
	 */
	setCurrentTime(newTime) {
		this.player.currentTime = newTime
	}

	/**
	 * Get the player duration
	 * @returns {Float|Integer} Duration of the video
	 */
	getDuration() {
		return new window.Promise((resolve) => resolve(this.player.duration))
	}

	/**
	 * Function executed on the video progress changed
	 * @param {Object} e Event listener datas
	 */
	onProgressChanged(e) {
		this.getDuration().then((duration) => {
			this.setCurrentTime((e.target.value * duration) / 100)
		})
	}

	/**
	 * Play method of the player
	 */
	methodPlay() {
		this.player.play()
	}

	/**
	 * Pause method of the player
	 */
	methodPause() {
		this.player.pause()
	}

	/**
	 * Mute method of the player
	 */
	methodMute() {
		this.player.muted = true
		this.player.setAttribute('muted', '')
	}

	/**
	 * Unmute method of the player
	 */
	methodUnMute() {
		this.player.muted = false
		this.player.removeAttribute('muted')
	}

	/**
	 * Function executed when the video is waiting
	 */
	onWaiting() {
		this.loading(true)
	}

	/**
	 * Function executed when the video is playing
	 */
	onPlaying() {
		this.loading(false)
	}

	/**
	 * Function executed when the video is seeking
	 */
	onSeeking() {
		this.loading(true)
	}

	/**
	 * Function executed when the video seek is done
	 */
	onSeeked() {
		this.loading(false)
	}

	/**
	 * Unbind event listeners
	 */
	removeSpecificEvents() {
		this.options.time && this.player.removeEventListener('durationchange', this.updateDuration)

		this.player.removeEventListener('timeupdate', this.updateCurrentTime)
		this.player.removeEventListener('playing', this.onPlaying)
		this.player.removeEventListener('waiting', this.onWaiting)
		this.player.removeEventListener('seeking', this.onSeeking)
		this.player.removeEventListener('seeked', this.onSeeked)
		this.player.removeEventListener('ended', this.onVideoEnded)
	}
}
