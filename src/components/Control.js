import React, { Component } from 'react';
import editBtn from '../../src/logo512.png';

class Control extends Component {
    render(){
      console.log('Headerbar render');
      return (
        <ul>
          {/* update page를 각 상세 페이지로 연결하도록 수정할거야 */}
          <li><a href="/update" onClick={function(e){
            e.preventDefault();
            this.props.onChangeMode('update');
          }.bind(this)}>{ editBtn }</a></li>
        </ul>
      );
    }
  }

export default Control;