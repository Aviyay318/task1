import React from 'react';

class Moving extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0
        };
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    componentDidMount() {
        window.addEventListener('mousemove', this.handleMouseMove);
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

    render() {
        const { x, y } = this.state;

        return (
            <div
                style={{
                    position: 'absolute',
                    top: y,
                    left: x,
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'red'
                }}
            ></div>
        );
    }
}

export default Moving;
