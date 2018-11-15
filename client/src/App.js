import React from "react";
import io from "socket.io-client";
import './App.css';


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            coordinates: 'hello world',
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            xx: 0,
            yy: 0
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);


        this.socket = io('localhost:5000');
        this.socket.on('RECEIVE_COORDINATES', (data) => {
            this.setState({
              xx: data.x,
              yy: data.y
            })
            console.log(document.documentElement.scrollTop, "this here");
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


    render(){
        return (
            <div className="container" onMouseMove={this._onMouseMove}>

                <img className="cursor" src="https://bit.ly/2QJEezD" />
                
                <div>
                {this.state.x}, {this.state.y}
                </div>
                <div>
                  {this.state.xx}, {this.state.yy}
                </div>
            </div>
        );
    }
}

export default App;
