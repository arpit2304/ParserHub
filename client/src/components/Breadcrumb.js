import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Breadcrumb extends Component {

    constructor() {
        super();
        this.keyIndex = 1000;
    }
    
    getNextKey = () => {
        this.keyIndex += 1;
        return this.keyIndex;
    }

    renderPath = (paths) => {
        const elements = [];

        for (let i = 0; i < paths.length - 1; i++) {
            elements.push(
                <li className="breadcrumb-item" key={this.getNextKey()}>
                    <button 
                        onClick={() => this.props.onClickHandler(paths.slice(0, i + 1).join("$"))}
                    >
                        {paths[i]}
                    </button>
                </li>
            );
        }

        elements.push(
            <li className="breadcrumb-item active" key={this.getNextKey()}>
                {paths[paths.length - 1]}
            </li>
        );

        return elements;
    }

    render() {
        return (
            <React.Fragment>
                <nav aria-label="breadcrumb" key={this.getNextKey()}>
                    <ol className="breadcrumb" key={this.getNextKey()}>
                        {
                            this.renderPath(this.props.path)
                        }
                    </ol>
                </nav>
                <br />
            </React.Fragment>
          );
    }
  
}

export default Breadcrumb;
