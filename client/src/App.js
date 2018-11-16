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
            hidder: true,
            height: 0,
            x: 0,
            y: 0,
            xx: 0,
            yy: 0
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
        this.idleTimer = null
        this.onActive = this._onActive.bind(this);
        this.onIdle = this._onIdle.bind(this);


        this.socket = io('localhost:5000');
        this.socket.on('RECEIVE_COORDINATES', (data) => {
            this.setState({
              xx: data.x,
              yy: data.y
            })
        });


        this.sendCoordinates = ev => {
            this.socket.emit(
              'SEND_COORDINATES', {
              x: this.state.x,
              y: this.state.y,
            })

        }
    }

    componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
      return document.body.style.cursor = "none";
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight });
    }

    _onMouseMove(e) {
      this.setState({ x: e.screenX, y: e.screenY });

      this.sendCoordinates();

    }

    _onActive(e) {
      console.log('user is active', e);
      this.setState({
        hidder: true,
      })
    }

    _onIdle(e) {
      console.log('user is idle', e);
      this.setState({
        hidder: true,
      })
    }


    render(){

      let style_clicker = {
          position: "absolute",
          left: this.state.xx,
          top:this.state.yy,
          zIndex: 100000
      }


      if(this.state.hidder){
        return (
          <IdleTimer
             ref={ref => { this.idleTimer = ref }}
             element={document}
             onActive={this.onActive}
             onIdle={this.onIdle}
             timeout={1000}>
          <div>
          <div className="container"
            onMouseMove={this._onMouseMove}>

                <img className="cursor"
                style={style_clicker}
                src="https://bit.ly/2QJEezD" />

                <div className="hide-cursor"></div>

                <Iframe url="https://en.wikipedia.org/wiki/MacOS"
                  style={{zIndex: 1}}
                  id="myId"
                  className="myClassname"
                  display="initial"
                  position="relative"
                  allowFullScreen/>

            </div>
          </div>
          </IdleTimer>
        )
      }else{
        return (
          <IdleTimer
             ref={ref => { this.idleTimer = ref }}
             element={document}
             onActive={this.onActive}
             onIdle={this.onIdle}
             timeout={1000}>
             <div className="container"
               onMouseMove={this._onMouseMove}>

                   <img className="cursor"
                   style={style_clicker}
                   src="https://bit.ly/2QJEezD" />


                   <Iframe url="https://en.wikipedia.org/wiki/MacOS"
                     style={{zIndex: 1}}
                     id="myId"
                     className="myClassname"
                     display="initial"
                     position="relative"
                     allowFullScreen/>

               </div>
          </IdleTimer>
        )
      }



        // return (
        //
        //   <IdleTimer
        //    ref={ref => { this.idleTimer = ref }}
        //    element={document}
        //    onActive={this.onActive}
        //    onIdle={this.onIdle}
        //    timeout={1000}>
        //
        //     <div className="container"
        //     onMouseMove={this._onMouseMove}>
        //
        //         <img className="cursor"
        //         style={style_clicker}
        //         src="https://bit.ly/2QJEezD" />
        //
        //         <div className="hide-cursor" ></div>
        //
        //         <Iframe url="https://en.wikipedia.org/wiki/MacOS"
        //           style={{zIndex: 1}}
        //           id="myId"
        //           className="myClassname"
        //           display="initial"
        //           position="relative"
        //           allowFullScreen/>
        //
        //     </div>
        //
        //
        //     </IdleTimer>
        //
        // );
    }
}

export default App;
