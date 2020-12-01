const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const vaultAddr = process.env.VAULT_ADDR || 'https://cellar.umusic.com';

async function vaultUserPassLogin(user, pass) {
  return new Promise(async (res, rej) => {
    try {
      let resp = await axios.post(vaultAddr + '/v1/auth/userpass/login/' + user, {
        password: pass
      })
      res(resp.data.auth.client_token)
    } catch(e) {
      rej(e)
    }
  })
}

async function vaultLdapLogin(user, pass) {
  return new Promise(async (res, rej) => {
    try {
      let resp = await axios.post(vaultAddr + '/v1/auth/ldap/login/' + user, {
        password: pass
      })
      res(resp.data.auth.client_token)
    } catch(e) {
      rej(e)
    }
  })
}

async function vaultGetSecret(token, secret) {
  return new Promise(async (res, rej) => {
    try {
      let resp = await axios.get(vaultAddr + '/v1/guardian/data/' + secret, {
        headers: {
          'X-Vault-Token': token
        }
      })
      res(resp.data.data.data)
    } catch(e) {
      rej(e)
    }
  })
}

(async () => {
  try {
    if (!process.env.NODE_ENV) {
      console.error("NODE_ENV required")
      process.exit(1)
    }
    let token = ""
    let vaultTokenPath = path.join(require('os').homedir(), ".vault-token")
    if (process.env.VAULT_TOKEN) {
      token = process.env.VAULT_TOKEN
    } else if (fs.existsSync(vaultTokenPath)) {
      tokenFile = fs.readFileSync(vaultTokenPath)
      token = tokenFile.toString()
    } else if (!process.env.VAULT_USER || !process.env.VAULT_PASS) {
      console.log("VAULT_USER and VAULT_PASS required")
      process.exit(1)
    }
    if (process.env.VAULT_USER && process.env.VAULT_PASS) {
      switch (process.env.VAULT_METHOD) {
        case "ldap":
          console.log("Login to vault with ldap")
          token = await vaultLdapLogin(process.env.VAULT_USER, process.env.VAULT_PASS)
          break;
        case "userpass":
          console.log("Login to vault with userpass")
          token = await vaultUserPassLogin(process.env.VAULT_USER, process.env.VAULT_PASS)
          break;
        default:
          console.log("Login to vault with ldap")
          token = await vaultLdapLogin(process.env.VAULT_USER, process.env.VAULT_PASS)
  	      break;
      }
    }
    process.env.NODE_ENV = process.env.NODE_ENV.toLowerCase()
    console.log("Get secret for env", process.env.NODE_ENV)
    let data = await vaultGetSecret(token, 'guardian-ui/' + process.env.NODE_ENV)
    //fs.writeFileSync("src/config/index."+process.env.NODE_ENV+".json", JSON.stringify(data))
    let configData = JSON.stringify(data);
    let tpl = `window.env = ${configData}`;
    fs.writeFileSync("public/static/config/index.js", tpl);
  } catch(e) {
    console.log(e.message)
  }
})();
