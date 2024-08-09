const fs = require("fs")
const path = require("path")
const url = require("url")

function writeData(req, res) {
    try {
        let body = "";

        req.on('data', (d) => {
            body = body + d
        })

        req.on('end', (e) => {
            const value = JSON.stringify(body)

            const filepath = path.join(__dirname, "data.json")
            const fileData = JSON.parse(value)

            console.log(fileData);
            fs.writeFileSync(filepath, fileData)
        })
    }
    catch (err) {
        res.writeHead(500, { "Content-type": "application/json" })
        res.end(JSON.stringify(err));
    }
}

function updateData(req, res) {

    const data = fs.readFileSync("data.json", "utf-8")
    console.log(typeof data);

    const d = JSON.parse(data)
    console.log(typeof d);


    d.map((x) => {
        console.log(x.id)
    })


    // console.log(d);
    //update id->Query
    //body->name
}

function deleteData(req, res) {

    try {
        // console.log(req.url);

        const parsedUrl = url.parse(req.url, true);
        console.log(parsedUrl);

        const [,id]=parsedUrl.search.split('?')
        console.log(id);
        
        const existingdata = fs.readFileSync("data.json", "utf-8", (err, data) => {
            return data
        })

        console.log(existingdata);

        // const d=Array(existingdata)
        // d.filter((x)=>x.id != id)
        // console.log(d);

        const filepath = path.join(__dirname, "data.json")
        const fileData = JSON.parse(existingdata, null, 2)

        fileData.push(JSON.parse(body))
        console.log(fileData);

        const file = JSON.stringify(fileData)
        fs.writeFileSync(filepath, file)


    }
    catch (err) {
        res.writeHead(500, { "Content-type": "application/json" })
        res.end(JSON.stringify(err));
    }
}

function readData(req, res) {

    try {

        const data = fs.readFileSync("data.json", "utf-8")
        res.writeHead(200, { "Content-type": "application/json" })
        res.end(JSON.parse(JSON.stringify(data)))
    }
    catch (err) {
        res.writeHead(500, { "Content-type": "application/json" })
        res.end(JSON.stringify(err));
    }
}

function addData(req, res) {
    try {
        let body = "";

        req.on('data', (d) => {
            body = body + d
        })

        req.on('end', (e) => {

            const existingdata = fs.readFileSync("data.json", "utf-8", (err, data) => {
                // console.log(data);
                return data
            })
            console.log({ existingdata });

            const filepath = path.join(__dirname, "data.json")
            const fileData = JSON.parse(existingdata, null, 2)

            fileData.push(JSON.parse(body))
            console.log(fileData);

            const file = JSON.stringify(fileData)
            fs.writeFileSync(filepath, file)
        })
    }
    catch (err) {
        res.writeHead(500, { "Content-type": "application/json" })
        res.end(JSON.stringify(err));
    }
}

module.exports = {
    writeData,
    updateData,
    deleteData,
    readData,
    addData
}