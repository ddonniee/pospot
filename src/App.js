import React, { Component } from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent"
// import CreateContent from "./components/CreateContent"
import UpdateContent from "./components/UpdateContent"
import Headerbar from "./components/Headerbar"
import Control from "./components/Control"
import './App.css';
import profile from './profile.png'


class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'main',
      selected_content_id:2,
      headerbar:{backbtn:'버튼', headerTxt:'기본정보관리'},
      main:{title:'main', desc:'Hello, React!!'},
      contents:[
        {id:1, title:'이름', desc:'포스팟'},
        {id:2, title:'생년월일', desc:'2021.05.13'},
        {id:3, title:'성별', desc:'여자'},
        {id:4, title:'전화번호', desc:'010-1234-5678'},
        {id:5, title:'이메일', desc:'pospot@naver.com'},
        {id:6, title:'비밀번호', desc:'비밀번호변경'}
      ]
    }
  }
  getReadContent(){
    var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          return data;
          break;
        }
        i = i + 1;
      }
  }
  getContent(){
    var _title, _desc, _article = null;
    if(this.state.mode ===  'main'){
      _title = this.state.main.title;
      _desc = this.state.main.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read'){
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } 
    // else  if(this.state.mode === 'create'){
    //   _article = <CreateContent onSubmit={function(_title, _desc){
    //     this.max_content_id = this.max_content_id+1;
    //     var _contents = Array.from(this.state.contents);
    //     _contents.push({id:this.max_content_id, title:_title, desc:_desc});
    //     this.setState({
    //       contents:_contents,
    //       mode:'read',
    //       selected_content_id:this.max_content_id
    //     });
    //   }.bind(this)}></CreateContent>
    // } 
    else  if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc){
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while(i < _contents.length){
            if(_contents[i].id === _id) {
              _contents[i] = {id:_id, title:_title, desc:_desc};
              break;
            }
            i = i + 1;
          }
          this.setState({
            contents:_contents,
            mode:'read'
          });
        }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  // class로 component를 생성할 경우 render() 메소드가 필수이며, return 값으로 jsx를 반환한다. 
  render() {
    console.log('App render');
    return (
      <div className="App">
        {/* 기본 정보 수정 */}
        <Headerbar 
          backbtn={this.state.headerbar.backbtn} 
          headerTxt={this.state.headerbar.headerTxt}
          onChangePage={function(){
            this.setState({mode:'main'});
          }.bind(this)}
        >
        </Headerbar>
        <img src={profile}></img>
        {/* mode 값을 확인하여 id 값과 해당 id에 저장된 data 읽어오기 */}
        <TOC 
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id:Number(id)
            });
          }.bind(this)} 
          data={this.state.contents}
        ></TOC>
        <Control onChangeMode={function(_mode){
          // if(_mode === 'delete'){
          //   if(window.confirm('really?')){
          //     var _contents = Array.from(this.state.contents);
          //     var i = 0;
          //     while(i < _contents.length){
          //       if(_contents[i].id === this.state.selected_content_id){
          //         _contents.splice(i,1);
          //         break;
          //       }
          //       i = i + 1;
          //     }
          //     this.setState({
          //       mode:'main',
          //       contents:_contents
          //     });
          //     alert('deleted!');
          //   }
          // } 
          if(_mode) {
            this.setState({
              mode:_mode
            });
          }
          
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}
// 작성한 컴포넌트를 다른곳에서 불러서 사용할 수 있도록 내보내기
export default App;
