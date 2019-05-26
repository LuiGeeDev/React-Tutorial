import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import ReadContent from "./components/ReadContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 4;
    this.state = {
      mode: "welcome",
      selected_content_id: 1,
      subject: { title: "WEB", sub: "World Wide Web!" },
      welcome: { title: "Welcome", desc: "Hello, React!" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is HyperText..." },
        { id: 2, title: "CSS", desc: "CSS is for design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" },
        { id: 4, title: "React", desc: "React is UI library..." }
      ]
    };
  }

  getReadContent() {
    let i = 0;
    while (i < this.state.contents.length) {
      const data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
      }
      i += 1;
    }
  }

  getContent() {
    let _title = null;
    let _desc = null;
    let _article = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc} />;
    } else if (this.state.mode === "read") {
      const content = this.getReadContent();
      _article = <ReadContent title={content.title} desc={content.desc} />;
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          onSubmit={function(_title, _desc) {
            // add content to this.state.contents
            this.max_content_id += 1;
            const new_content = {
              id: this.max_content_id,
              title: _title,
              desc: _desc
            };
            const contents = this.state.contents.concat(new_content);
            this.setState({
              selected_content_id: new_content.id,
              mode: "read",
              contents
            });
          }.bind(this)}
        />
      );
    } else if (this.state.mode === "update") {
      _article = (
        <UpdateContent
          data={this.getReadContent()}
          onSubmit={function(id, _title, _desc) {
            const contents = Array.from(this.state.contents);
            for (let content of contents) {
              if (content.id === id) {
                contents[id - 1] = {id: id, title: _title, desc: _desc};
                break;
              }
            }
            this.setState({ 
              contents,
              mode: "read",
             });
          }.bind(this)}
        />
      );
    }

    return _article;
  }

  render() {
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function() {
            this.setState({ mode: "welcome" });
          }.bind(this)}
        />
        <Navigation
          onChangePage={function(id) {
            this.setState({
              mode: "read",
              selected_content_id: Number(id)
            });
          }.bind(this)}
          data={this.state.contents}
        />
        <Control
          onChangeMode={function(mode) {
            if (mode === "delete") {
              if (window.confirm("삭제하시겠어요?")) {
                let contents = Array.from(this.state.contents);
                const id = this.state.selected_content_id;
                contents.splice((id - 1), 1);
                this.setState({
                  contents,
                  mode: "welcome"
                });
              }
            } else {
              this.setState({ mode });
            }
          }.bind(this)}
        />
        {this.getContent()}
      </div>
    );
  }
}

export default App;
