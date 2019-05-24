import React, { Component } from "react";

class Navigation extends Component {
  render() {
    const lists = [];
    const data = this.props.data;
    let i = 0;
    while (i < data.length) {
      lists.push(
        <li key={data[i].id}>
          <a 
            onClick={function(event) {
              event.preventDefault();
              this.props.onChangePage(event.target.dataset.id);
            }.bind(this)}
            href={"/content/" + data[i].id}
            data-id={data[i].id}
          >
            {data[i].title}
          </a>
        </li>
      );
      i = i + 1;
    }
    return (
      <nav>
        <ul>{lists}</ul>
      </nav>
    );
  }
}

export default Navigation;
