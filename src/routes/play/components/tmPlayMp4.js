/**
 * mp4播放
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Icon} from 'antd';
import {formatTime, fullScreen, exitFullScreen} from '../../../utils/index'
import styles from './tmPlayMp4.less'
import volumeOn from '../../../assets/volume-on.png'
import volumeOff from '../../../assets/volume-off.png'
import fullScreenOn from '../../../assets/fullscreen.png'
import fullScreenExit from '../../../assets/fullscreen_exit.png'

class TmPlayMp4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaused: false,
      currentTime: props.mp4Data.LastPostion,
      duration: 0,
      volume: 1,
      isFullScreen: false,
      isShowControls: false,
      portalId: props.mp4Data.PortalId,
      userId: props.mp4Data.UserId,
      courseId: props.mp4Data.CourseId,
      location: props.mp4Data.Location,
      url: props.mp4Data.Url,
    };
    this.playPauseClick = this.playPauseClick.bind(this);
    this.seekRangeChange = this.seekRangeChange.bind(this);
    this.volumeChange = this.volumeChange.bind(this);
    this.toggleVolume = this.toggleVolume.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
    this.showControls = this.showControls.bind(this);
    this.hideControls = this.hideControls.bind(this);
  }
  
  componentDidMount() {
    //设置初始播放位置
    this.playVideo.currentTime = this.state.currentTime;
    //设置初始音量
    this.playVideo.volume = this.state.volume;
    //获取时长
    this.timerDuration = setTimeout(() => {
      let duration = Math.round(this.playVideo.duration);
      if (duration) {
        this.setState({duration});
        clearTimeout(this.timerDuration);
      }
    }, 1000);
    //当前时间
    this.timerID = setInterval(() => {
      let currentTime = Math.round(this.playVideo.currentTime);
      let location = Math.round(this.state.location);
      if (currentTime < location && currentTime > location - 2 && location < this.state.duration) {
        location++;
        this.setState({location});
      }
      this.setState({currentTime});
    }, 1000);
    //播放结束暂停视频
    this.playVideo.addEventListener("ended", () => {
      this.setState({isPaused: true});
    }, false);
    //播放时
    this.playVideo.addEventListener("play", () => {
      console.log("play")
    }, false);
    //视频暂停
    this.playVideo.addEventListener("pause", () => {
      console.log("pause")
    }, false);
    //提交进度
    this.sendProgressTimer = setInterval(() => {
      this.props.sendProgress({
        "portalId": this.state.portalId,
        "userId": this.state.userId,
        "courseId": this.state.courseId,
        "positionen": this.state.currentTime.toString().rsaEnscrypt()
      });
    }, 30000);
  }
  
  componentWillUnmount() {
    clearInterval(this.timerID);
    clearInterval(this.timerDuration);
    clearInterval(this.sendProgressTimer);
  }
  
  //暂停播放控制
  playPauseClick() {
    this.pauseTimer = setTimeout(() => {
      let isPaused = this.playVideo.paused;
      isPaused ? this.playVideo.play() : this.playVideo.pause();
      this.setState({
        isPaused: !isPaused
      });
    }, 200)
  }
  
  //进度条
  seekRangeChange() {
    let seekValue = this.seekRange.value;
    let setCurrentTime = Math.round(seekValue / 100 * this.state.duration);
    if (setCurrentTime < this.state.location + 2) {
      this.playVideo.currentTime = setCurrentTime;
      this.setState({
        currentTime: setCurrentTime
      });
    } else {
      alert("请不要在未播放区域拖动，否则可能丢失进度！");
      this.playVideo.currentTime = this.state.currentTime;
      this.playVideo.pause();
      this.setState({isPaused: true});
    }
  }
  
  //音量/静音切换
  toggleVolume() {
    let volume = this.state.volume;
    if (volume > 0) {
      this.setState({volume: 0});
      this.playVideo.volume = 0;
    } else {
      this.setState({volume: this.volumeRange.value});
      this.playVideo.volume = this.volumeRange.value;
    }
  }
  
  //全屏切换
  toggleFullScreen() {
    let isFullScreen = this.state.isFullScreen;
    isFullScreen ? exitFullScreen() : fullScreen(this.tmPlayMp4);
    this.setState({
      isFullScreen: !isFullScreen
    })
  }
  
  //音量控制
  volumeChange() {
    clearTimeout(this.pauseTimer);
    let newVolumeValue = this.volumeRange.value;
    this.playVideo.volume = newVolumeValue;
    this.setState({
      volume: newVolumeValue
    });
  }
  
  //控制条显示
  showControls() {
    if (!this.state.isShowControls) {
      this.setState({isShowControls: true});
      this.showControlsTimer = setTimeout(() => {
        this.setState({isShowControls: false});
        clearTimeout(this.showControlsTimer);
      }, 5000);
    }
  }
  
  //控制条隐藏
  hideControls() {
    if (this.state.isShowControls) {
      this.setState({isShowControls: false});
    }
  }
  
  render() {
    // 使用 `ref` 的回调将 text 输入框的 DOM 节点存储到 React
    // 实例比如 this.textInput）
    const {
      isPaused,
      currentTime,
      duration,
      volume,
      isFullScreen,
      isShowControls,
      portalId,
      userId,
      courseId,
      location,
      url
    } = this.state;
    return (
      <div className={styles.tmPlayMp4} ref={(tmPlayMp4) => {
        this.tmPlayMp4 = tmPlayMp4
      }}>
        <div className={styles.myplayer}
             ref={(myplayer) => {
               this.myplayer = myplayer
             }}
             onMouseEnter={this.showControls}
             onMouseLeave={this.hideControls}
             onMouseMove={this.showControls}
        >
          <video width={'100%'} height={'100%'} autoPlay
                 ref={(video) => {
                   this.playVideo = video;
                 }}>
            <source src={url} type="video/mp4"/>
            您的浏览器不支持Video标签。
          </video>
          <div className="overlay_component"
               onClick={this.playPauseClick}
               onDoubleClick={this.toggleFullScreen}
          >
            {
              isPaused &&
              <span className="overlay_inner"><Icon type="caret-right"/></span>
            }
          </div>
          <div className="controls" style={{opacity: isShowControls ? 1 : 0}}>
            <div className="playPause_component">
              <button className="playPause_button" onClick={this.playPauseClick}>
                {
                  isPaused ? <Icon type="pause"/> : <Icon type="caret-right"/>
                }
              </button>
            </div>
            <div className="time_component ">
              <span className="time_current">{formatTime(currentTime)}</span> /&nbsp;
              <span className="time_duration">{formatTime(duration)}</span>
            </div>
            <div className="seek_component">
              <div className="seek_track">
                <div className="seek_buffer"></div>
                <div className="seek_fill" style={{width: `${currentTime / duration * 100}%`}}></div>
                <div className="seek_location" style={{left: `${location / duration * 100}%`}}></div>
                <input type="range" step="1" min="0" max="100"
                       orient="horizontal" aria-label="Seek video"
                       className="seek_input" defaultValue="0"
                       ref={(input) => {
                         this.seekRange = input
                       }}
                       onChange={this.seekRangeChange}
                />
              </div>
            </div>
            <div className="volume_component">
              <button aria-label="Mute video" onClick={this.toggleVolume} className="volume_button" type="button">
                {
                  volume > 0 ?
                    <img src={volumeOn} alt="开"/>
                    :
                    <img src={volumeOff} alt="关"/>
                }
              </button>
              <div className="volume_slider">
                <div className="volume_track">
                  <div className="volume_fill" style={{height: `${volume * 100}%`}}></div>
                  <input type="range" step="0.1" min="0" max="1" orient="vertical"
                         aria-label="Change volume"
                         className="volume_input"
                         ref={(input) => {
                           this.volumeRange = input
                         }}
                         onChange={this.volumeChange}/>
                </div>
              </div>
            </div>
            <div className="fullScreen_component">
              <button aria-label="Mute video" onClick={this.toggleFullScreen} className="fullScreen_button"
                      type="button">
                {
                  isFullScreen ?
                    <img src={fullScreenExit} alt="退出"/>
                    :
                    <img src={fullScreenOn} alt="全屏"/>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


TmPlayMp4.propTypes = {
  mp4Data: PropTypes.object,
  sendProgress: PropTypes.func,
};
export default TmPlayMp4;
