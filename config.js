const axios = require('axios');
const fs = require('fs');
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
    let token = ""
    if (!process.env.VAULT_USER || !process.env.VAULT_PASS) {
      console.log("VAULT_USER and VAULT_PASS required")
      process.exit(1)
    }
    switch (process.env.VAULT_METHOD) {
      case "ldap":
        token = await vaultLdapLogin(process.env.VAULT_USER, process.env.VAULT_PASS)
        break;
      case "userpass":
        token = await vaultUserPassLogin(process.env.VAULT_USER, process.env.VAULT_PASS)
      default:
        token = await vaultUserPassLogin(process.env.VAULT_USER, process.env.VAULT_PASS)
    }
    process.env.NODE_ENV = process.env.NODE_ENV.toLowerCase()
    let data = await vaultGetSecret(token, 'guardian-ui/' + process.env.NODE_ENV)
    fs.writeFileSync("src/config/index.json", JSON.stringify(data))
  } catch(e) {
    console.log(e)
  }
})();
