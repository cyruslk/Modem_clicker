import React from "react";
import io from "socket.io-client";
import Iframe from 'react-iframe';
import IdleTimer from 'react-idle-timer'
import './App.css';


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            width: 0,
            display: "block",
            hidder: true,
            height: 0,
            x: 0,
            y: 0,
            xx: 0,
            yy: 0
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.idleTimer = null;
        this.socket = io('localhost:5000');
        this.idleTimer = null;
        this.onActive = this._onActive.bind(this)
        this.onIdle = this._onIdle.bind(this)

        this.sendCoordinates = ev => {
            this.socket.emit(
              'SEND_COORDINATES', {
              x: this.state.x,
              y: this.state.y,
            })
        }
        this.stopSound = ev => {
            this.socket.emit('STOP_SOUND')
          }
    }

    _onAction = (e) => {
      // console.log('user did something', e)
     }

     _onActive = (e) => {
       // console.log('time remaining', this.idleTimer.getRemainingTime())
     }

     _onIdle(e) {
      this.stopSound();
    }



    componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions)

      this.socket.on(
        "SEND_BACK",
        (ele) => {
          let coordinatesEle = ele.split("][");
          let lastEle = coordinatesEle[coordinatesEle.length -1];
          console.log(lastEle.split(","));
          let splitedLastEle = lastEle.split(",");
          console.log(splitedLastEle[0], splitedLastEle[1]);
          this.setState({
            xx: splitedLastEle[0],
            yy: splitedLastEle[1]
          })
        }
      );


    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight });
    }

    _onMouseMove = (e) => {
      this.setState({ x: e.screenX, y: e.screenY });
      this.sendCoordinates();
    }

    render(){
      console.log(this.state.xx, this.state.yy);
      let style_clicker = {
          position: "absolute",
          left: `${this.state.xx}px`,
          top: `${this.state.yy}px`,
          zIndex: 100000,
          width: "20px"
      }

      let display = {
        display: this.state.display
      }

        return (
          <div>
          <IdleTimer
            ref={ref => { this.idleTimer = ref }}
            element={document}
            onActive={this.onActive}
            onIdle={this.onIdle}
            timeout={2000}>
            <div className="container"
              style={{backgroundColor: "white"}}
              onMouseMove={this._onMouseMove}>

              <img
                className="cursor"
                alt={"img"}
                style={style_clicker}
                src="https://bit.ly/2QJEezD"
              />

          <div className="hide-cursor" style={display}></div>


            </div>
            </IdleTimer>
          </div>
        )
    }
}

export default App;
