import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFileAlt } from 'react-icons/fa';
import { GoFileDirectory } from 'react-icons/go';

class Directory extends Component {

    constructor() {
        super();
        this.keyIndex = 0;
    }
    
    getNextKey = () => {
        this.keyIndex += 1;
        return this.keyIndex;
    }

    render() {
        return (
            <div style={{ backgroundColor: '#e9ecef', padding: "10px" }} className="text-left" key={this.getNextKey()}>
                {this.props.fileName === undefined
                    ? this.props.nodes.map(node => {
                        return <div key={this.getNextKey()}> 
                            <button 
                                onClick={(e) => {
                                    e.target.disabled = true;
                                    this.props.onClickHandler(node["name"], node["type"])}
                                } 
                                style={{ margin: "5px" }}
                            >
                                {node.type === "file" ? <FaFileAlt /> : <GoFileDirectory />} {node["name"]} 
                            </button>
                        </div>
                    })
                    : <p>This is file: {this.props.fileName} </p>
                }
                
            </div>
        );
    }

}

export default Directory;