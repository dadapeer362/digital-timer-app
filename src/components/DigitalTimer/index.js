// Write your code here
import {Component} from 'react'
import './index.css'

const playImg = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
const pauseImg = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

class DigitalTimer extends Component {
  state = {
    startTime: 25 * 60,
    setTimer: 25,
    timerStart: false,
    disableButton: false,
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  changeStartTime = () => {
    const {setTimer} = this.state
    this.setState({startTime: setTimer * 60})
  }

  onDecreaseTime = () => {
    const {disableButton} = this.state
    if (!disableButton) {
      this.setState(
        prevState => ({setTimer: prevState.setTimer - 1}),
        this.changeStartTime,
      )
    }
  }

  onIncreaseTime = () => {
    const {disableButton} = this.state
    if (!disableButton) {
      this.setState(
        prevState => ({setTimer: prevState.setTimer + 1}),
        this.changeStartTime,
      )
    }
  }

  tick = () => {
    this.setState(prevState => ({startTime: prevState.startTime - 1}))
  }

  onRunTimer = () => {
    this.timer = setInterval(this.tick, 1000)
  }

  onStopTimer = () => {
    clearInterval(this.timer)
  }

  runTimer = () => {
    const {timerStart} = this.state
    if (timerStart) {
      this.onRunTimer()
    } else {
      this.onStopTimer()
    }
  }

  onStartTimer = () => {
    this.setState(
      prevState => ({
        timerStart: !prevState.timerStart,
        disableButton: true,
      }),
      this.runTimer,
    )
  }

  onResetTimer = () => {
    this.setState({
      startTime: 25 * 60,
      setTimer: 25,
      timerStart: false,
      disableButton: false,
    })
    clearInterval(this.timer)
  }

  onSetMinutes = () => {
    const {startTime} = this.state
    const minutes = Math.floor(startTime / 60)
    if (minutes < 10) {
      return `0${minutes}`
    }
    return minutes
  }

  onSetSeconds = () => {
    const {startTime} = this.state
    const seconds = startTime % 60
    if (seconds < 10) {
      return `0${seconds}`
    }
    return seconds
  }

  render() {
    const {setTimer, timerStart} = this.state
    const setTime = `${this.onSetMinutes()}:${this.onSetSeconds()}`
    if (setTime === '00:00') {
      clearInterval(this.timer)
    }
    const iconImg = timerStart && setTime !== '00:00' ? pauseImg : playImg
    const timerText = timerStart && setTime !== '00:00' ? 'Running' : 'Paused'
    const imgAlt =
      timerStart && setTime !== '00:00' ? 'pause icon' : 'play icon'
    const startOrPause = timerStart ? 'Pause' : 'Start'

    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-item-container">
          <div className="timer-container">
            <div className="timer-inner-container">
              <h1 testid="timer" className="timer-heading">
                {setTime}
              </h1>
              <p className="timer-paragraph">{timerText}</p>
            </div>
          </div>
          <div className="timer-items-container-2">
            <div className="inner-timer-items-container">
              <div className="button-text-container">
                <button
                  type="button"
                  className="btn-img"
                  onClick={this.onStartTimer}
                >
                  <img className="play-icon" src={iconImg} alt={imgAlt} />
                  <p className="para-start-pause">
                    {setTime !== '00:00' ? startOrPause : 'Start'}
                  </p>
                </button>
              </div>
              <div className="button-text-container">
                <button
                  type="button"
                  className="btn-img"
                  onClick={this.onResetTimer}
                >
                  <img
                    className="play-icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                  <p className="para-start-pause">Reset</p>
                </button>
              </div>
            </div>
            <p className="timer-limit-para">Set Timer limit</p>
            <div className="plus-minus-container">
              <div className="btn-plus-minus-container">
                <button
                  type="button"
                  className="btn-add-or-minus"
                  onClick={this.onDecreaseTime}
                >
                  -
                </button>
                <div className="timer-para-container">
                  <p className="para-timer-style">{setTimer}</p>
                </div>
                <button
                  type="button"
                  className="btn-add-or-minus"
                  onClick={this.onIncreaseTime}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
