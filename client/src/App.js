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
            y: 0
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);


        this.socket = io('localhost:5000');
        this.socket.on('RECEIVE_COORDINATES', function(data){
            addMessage(data);
        });


        const addMessage = data => {
            console.log(data);
            console.log(this.state.messages);
        };

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
            <div
            className="container"
            onMouseMove={this._onMouseMove}
            onClick={this.sendCoordinates}>
              {this.state.x}, {this.state.y}
            </div>
        );
    }
}

export default App;
