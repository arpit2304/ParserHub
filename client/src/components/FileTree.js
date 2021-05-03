import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Breadcrumb from './Breadcrumb';
import Directory from './Directory';

class FileTree extends Component {

    constructor() {
        super();
        this.state = {
            currentPath: ['root'],
            content: {nodes:[]},
            fileName: undefined
        };
    }

    componentDidMount() {
        fetch("/path/root")
            .then(response => response.json())
            .then(data => this.setState({ content: data }))
    }

    directoryOnClickHandler = (path, type) => {
        if (type === "file") {
            this.setState({ currentPath: [...this.state.currentPath, path], fileName: path })
        } else {
            this.setState({ currentPath: [...this.state.currentPath, path], fileName: undefined })

            let url = `${this.state.currentPath.join("$")}$${path}`;
            url = url.replace('root$', '');

            fetch(`/path/${url}`)
                .then(response => response.json())
                .then(data => this.setState({ content: data }))
        }
    }

    breadcrumbOnClickHandler =(path) => {
        this.setState({ currentPath: path.split("$"), fileName: undefined });

        let url = path.replace('root$', '');
        fetch(`/path/${url}`)
            .then(response => response.json())
            .then(data => this.setState({ content: data }))
    }


    render() {
        return (
            <div className="container">
                <Breadcrumb path={this.state.currentPath} onClickHandler={this.breadcrumbOnClickHandler} />
                <Directory nodes={this.state.content.nodes} fileName={this.state.fileName} onClickHandler={this.directoryOnClickHandler} />
            </div>
        );
    }

}

export default FileTree;