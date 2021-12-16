import React, { Component } from 'react';
import App from '../App';
class Headerbar extends Component {
    render(){
      console.log('Headerbar render');
      return (
        <header>
            <h1><a href="/" onClick={function(e){
              e.preventDefault();
              this.props.onChangePage();
            }.bind(this)}>{this.props.backbtn}</a></h1>
            {this.props.headerTxt}
        </header>  
      );
    }
  }

  export default Headerbar;