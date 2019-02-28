const fs = require('fs');
const replace = require('replace-in-file');
// default .env file
let ENV_FILE=".env"
// if an [env].env file exists, use for environment
if(fs.existsSync(process.env.NODE_ENV + ".env")) {
  ENV_FILE=process.env.NODE_ENV + ".env"
}
// set process.env from environment-specific .env file
require('dotenv').config({path: ENV_FILE});

// replaceInFile copies template templ to output file outfile
// and replaces strings in the file using replaceOpts
function replaceInFile(templ, outfile, replaceOpts) {
  fs.copyFileSync(templ, outfile);
  replaceOpts.files = outfile
  try {
    const changes = replace.sync(replaceOpts);
  } catch (e) {
    console.log("Replacement Error:", e);
  }
}

// create array of all replacement files and options
let replacements = [
  {
    templ: "src/config/index.templ.js",
    outfile: "src/config/index.js",
    replaceOpts: {
      from: [/{{OKTA_ISSUER}}/g, /{{OKTA_CLIENT_ID}}/g],
      to: [process.env.OKTA_ISSUER, process.env.OKTA_CLIENT_ID],
    }
  }
];

// iterate replacements and execute replacement for each file
for (let i = 0; i < replacements.length; i++) {
  replaceInFile(replacements[i].templ, replacements[i].outfile, replacements[i].replaceOpts);
}
