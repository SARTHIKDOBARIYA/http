const fs = require("fs");
const path = require("path");
const url = require("url");

function writeData(req, res) {
    try {
        let body = "";

        req.on('data', (d) => {
            body += d;
        });

        req.on('end', () => {
            const filePath = path.join(__dirname, "data.json");
            const data = JSON.parse(body);

            fileData=JSON.stringify(data, null, 2)

            fs.writeFileSync(filePath, fileData);

        });
    } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
    }
}

function updateData(req, res) {
    try {
        let body = "";

        req.on('data', (d) => {
            body += d;
        });

        req.on('end', () => {
            const parsedUrl = url.parse(req.url, true);
            const id = parsedUrl.query.id;

            const filePath = path.join(__dirname, "data.json");
            let data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

            const dataIndex = data.findIndex((x) => x.id === id);

            if (dataIndex !== -1) {
                const parsedBody = JSON.parse(body);
                data[dataIndex] = { ...data[dataIndex], ...parsedBody };

                fileData=JSON.stringify(data, null, 2)

                fs.writeFileSync(filePath, fileData);

            } else {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "ID not found" }));
            }
        });
    } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
    }
}

function deleteData(req, res) {
    try {
        const parsedUrl = url.parse(req.url, true);
        const id = parsedUrl.query.id;
        
        const filePath = path.join(__dirname, "data.json");

        let existingdata = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        const Data = existingdata.filter((x) => x.id !== id);

        if (existingdata.length === Data.length) {
            
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "ID not found" }));
        
        } 
        else {

            fileData=JSON.stringify(Data, null, 2)
            fs.writeFileSync(filePath, fileData);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Data deleted successfully" }));
        
        }
    } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
    }
}

function readData(req, res) {
    try {
        const filePath = path.join(__dirname, "data.json");
        const data = fs.readFileSync(filePath, "utf-8");

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
    } 
    catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
    }
}

function addData(req, res) {
    try {
        let body = "";

        req.on('data', (d) => {
            body += d;
        });

        req.on('end', () => {
            const filePath = path.join(__dirname, "data.json");
            let data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

            data.push(JSON.parse(body));

            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));


        });
    } 
    catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
    }
}

module.exports = {
    writeData,
    updateData,
    deleteData,
    readData,
    addData
};
