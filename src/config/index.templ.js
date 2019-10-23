const config = {
  okta: {
    issuer: '{{OKTA_ISSUER}}',
    redirect_uri: window.location.origin + '/implicit/callback',
    client_id: '{{OKTA_CLIENT_ID}}'
  }, 

  api : {
    key : '{{API_KEY}}'
  }
}


module.exports = config
