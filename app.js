import http from "http";
import fs from "fs";

import requests from 'requests';
const indexFile=fs.readFileSync("index.html","utf-8");
const replaceVal=(tempVal,orgVal)=>{
let temperature=tempVal.replace("{%temp%}",orgVal.main.temp);
 temperature=temperature.replace("{%tempmin%}",orgVal.main. temp_min);
 temperature=temperature.replace("{%tempmax%}",orgVal.main.temp_max);
 temperature=temperature.replace("{%location%}",orgVal.name);
 temperature=temperature.replace("{%country%}",orgVal.sys.country);
 temperature=temperature.replace("{%tempStatus%}",orgVal.weather[0].main);
 return temperature;

}
const server =http.createServer((req,res)=>{
if(req.url="/"){
    requests('https://api.openweathermap.org/data/2.5/weather?q=Osaka,21,+81&appid=4744725d51938338e9de14f99d495ce3&units=metric')
.on('data', (chunk)=> {
    const objData=JSON.parse(chunk);
    const arrData=[objData];
  const realTimeData=arrData.map((val)=>replaceVal(indexFile,val)).join("");
    
    res.write(realTimeData);
 
})
.on('end', (err)=> {
  if (err) return console.log('connection closed due to errors', err);
  res.end();
});
}
})
server.listen(8000,"127.0.0.1");
