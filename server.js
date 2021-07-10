const http = require('http')
const url  = require('url')
const fs = require('fs')

const get404ErrorFile = async () => {
  const file = await fs.promises.readFile('./404.html',(err,data)=>{
    return data
  })
  return file
}
http.createServer((req,res)=>{
  let q = url.parse(req.url,true)
  let filename = "." + q.pathname
  if(q.pathname!=='/favicon.ico' && q.pathname!=='/'){
    filename = filename + ".html"
  }
  if(q.pathname=='/'){
    filename = filename + 'home.html'
  }
  fs.readFile(filename, (err,data)=>{
    if(err){
      get404ErrorFile()
      .then((file)=>{
        res.writeHead(404,{'Content-Type': 'text/html'})
        res.write(file)
        return res.end()
      })
    }
    else{
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(data)
    return res.end()
    }
  })
}).listen(8080)