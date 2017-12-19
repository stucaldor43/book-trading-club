import React from "react";
import Header from "./Header.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
              <Header>Header</Header>
                { this.props.children }
              <footer></footer>
            </div>
        );
    }
}

export default App;