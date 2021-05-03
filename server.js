const express = require("express");
const { root } = require("./sample-data");

const app = express();
const port = 5000;

app.get("/path/:query", (req, res) => {
    let pathQuery = req.params.query;
    let pathTrace = pathQuery.split("$");

    let response = root;
    if (pathTrace[0] !== "root") {
        for (let i = 0; i < pathTrace.length; i++) {
            response = response.children[pathTrace[i]];
        }
    }

    let answer = {};
    if (response.type === "dir") {
        let nodes = response.children;
        answer = {
            type: response.type,
            nodes: Object.keys(nodes).map(node => {
                return {
                    "name": node,
                    "type": nodes[node]["type"]
                }
            })
        }
    } else {
        answer = {
            type: response.type
        }
    }
    

    res.json(answer);
});

app.listen(port, () => console.log(`Server started on port: ${port}`));
