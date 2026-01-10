[]import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'api', 'seferler.json');

export default function handler(req,res){
  if(req.method==='GET'){
    const data = JSON.parse(fs.readFileSync(filePath,'utf-8'));
    res.status(200).json(data);
  } else if(req.method==='PUT'){
    const body = req.body;
    fs.writeFileSync(filePath, JSON.stringify(body,null,2));
    res.status(200).json({status:"ok"});
  } else {
    res.status(405).end();
  }
}
