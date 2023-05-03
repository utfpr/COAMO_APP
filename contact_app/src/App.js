import React, { Component } from "react";
import api from "./api_access";


class App extends Component {
  state = {data: []}

  async componentDidMount() {
    const response = await api.get('users');
    this.setState({ data: response.data });
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        {data.map(function(item) {
          return <p key={item.id}>{item.name}</p>
        })}
      </div>
    );
  }
};

export default App;
