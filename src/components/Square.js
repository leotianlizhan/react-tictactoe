import React, { Component } from 'react';
import { Button, Media } from 'reactstrap';
import donut from '../assets/donut.svg';
import sticks from '../assets/cinnamon_sticks.svg';

class Square extends React.Component {
  
  renderImage() {
    if(this.props.value === 'X'){
      return (<img src={donut}/>);
    } else if(this.props.value === 'O'){
      return (<img src={sticks}/>);
    } else {
      return "";
    }
  }

  render() {
    return (
      <Button outline color="secondary" className="square" style={styles} onClick={this.props.onClick}>
        {this.renderImage()}
      </Button>
    );
  }
}

let styles = {
  width: '10vw',
  height: '10vw'
}

let imgStyles = {
  float: 'left',
  marginRight: '0.5em'
}

export default Square;