import React, {Component} from 'react';
import Header from './Header';
import Demo from './Demo';

class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <Header/>
                <Demo/>
            </div>
        )
    }
}

export default App;
