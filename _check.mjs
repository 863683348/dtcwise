import fs from "node:fs";
const tools = JSON.parse(fs.readFileSync("src/data/tools.json","utf8"));
const blog = JSON.parse(fs.readFileSync("src/data/blog.json","utf8"));
let badShot=0, badFaq=0;
for (const t of tools){
  if(typeof t.screenshot!=="string"||!t.screenshot.startsWith("/screenshots/")) badShot++;
  if(!Array.isArray(t.faq)||t.faq.length!==3) badFaq++;
}
const lines=[];
lines.push("tools="+tools.length);
lines.push("blog="+blog.length);
lines.push("badScreenshot="+badShot);
lines.push("badFaq="+badFaq);
const sample=tools[0];
lines.push("sampleKeys="+Object.keys(sample).join(","));
lines.push("sampleFaq0="+JSON.stringify(sample.faq[0]));
fs.writeFileSync("validate.log", lines.join("\n")+"\n");
