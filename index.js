// name,id
//  method =user

// user create-> read json file require read
// add new data in file using push
// convert into string
// write data using fs module

// listing-> read and return

//delete 

//update -> map and update

const http=require('http')
const { writeData, 
    addData,
    updateData,
    readData,
    deleteData}=require("./func")
const url=require('url')

http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    console.log(parsedUrl);

    // console.log(req.url);

    if (parsedUrl.pathname === "/create" && req.method === "POST") {
        writeData(req,res)
    }

    if (parsedUrl.pathname==="/update" && req.method==="PUT"){
        updateData(req,res)
    }

    if(parsedUrl.pathname==="/read" && req.method==="GET"){
        readData(req,res)
    }

    if(parsedUrl.pathname==="/delete" && req.method==="DELETE"){
        deleteData(req,res)
    }

    if(parsedUrl.pathname==="/add" && req.method==="POST"){
        addData(req,res)
    }
}).listen(8000, () => {
    console.log("Server running at port 8000");
})