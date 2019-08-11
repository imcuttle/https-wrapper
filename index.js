/**
 * Wrap http server as https
 * @author imcuttle
 */

const createCert = require('create-cert')
const httpProxy = require('http-proxy')

module.exports = ({ days, commonName, target, ...rest } = {}) => {
  return createCert({
    days,
    commonName
  }).then(keys => {
    return httpProxy.createProxyServer({
      target,
      secure: false,
      ...rest,
      ssl: {
        ...keys,
        ca: keys.caCert,
        ...rest.ssl
      }
    })
  })
}
