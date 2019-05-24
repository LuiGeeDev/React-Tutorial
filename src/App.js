import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import Content from "./components/Content";
import Subject from "./components/Subject";

class App extends Component {
  constructor(props) {
    super(props);
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

  render() {
    let _title = null;
    let _desc = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === "read") {
      let i = 0;
      while (i < this.state.contents.length) {
        const data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i += 1;
      }
    }
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
        <Content title={_title} desc={_desc} />
      </div>
    );
  }
}

export default App;
