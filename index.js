const https = require('https')

/**
 * Main instance class for REMP API access
 * @class Remp
 * @author Alexander Merz
 * @license Apache License 2.0
 */
class Remp {
  /**
     * Creates the instance
     * @constructor
     * @param {string} server the server to connect to, for example: https://crm.press
     * @param {string} token the token to use for authentication
     * @param {boolean} verbose whether to print debug information
     */
  constructor (server, token, verbose = false) {
    this.server = server
    this.token = token
    this.headers = {
      Authorization: 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    }
    this.verbose = verbose
    this.userToken = null
    this.lastError = null
  }

  /**
     * Sends the actual request
     *
     * If the request was successful and the responce contained an new response->access->token, you can
     * use createTokenInstance() to create a new instance with the new token.
     *
     * @param {string} method the http method to use
     * @param {string} path the path to the endpoint
     * @param {Array|string} params the parameters to send as JSON or object
     * @param {Array} optheaders additional headers to send
     */
  async request (method, path, params = '', optheaders = []) {
    const url = this.server + path
    const headers = Object.assign({}, this.headers, optheaders)
    const body = (typeof params !== 'string') ? JSON.stringify(params) : params

    if (this.verbose) {
      console.log(`${method} ${url}`)
      console.log(headers)
      console.log(body)
    };

    return new Promise((resolve, reject) => {
      const req = https.request(
        url,
        {
          method,
          headers
        },
        (response) => {
          if (response.statusCode !== 200) {
            return reject(new RempError('http-failure', response))
          }

          let data = ''
          response.on('data', (chunk) => {
            data += chunk
          })
          response.on('end', () => {
            if (this.verbose) {
              console.log(data)
            };
            const result = JSON.parse(data)

            // we check the result for an access token, if it is there, we store the token for potential later use
            this.userToken = null
            this.lastError = null
            if (result && this.isSuccess(result)) {
              if (result.access && result.access.token) {
                this.userToken = result.access.token
              }
            } else if (result && result.error) {
              this.lastError = result.error
            }
            return resolve(result)
          })
          response.on('error', (err) => {
            return reject(new RempError('remp-failure', err))
          })
        })
      if (body !== '') {
        req.write(body)
      }
      req.end()
    })
  }

  isSuccess (result) { return result.status && result.status === 'ok' }

  /**
     *
     * @param {string} path the path to the endpoint
     * @param {Array|string} params the parameters to send
     * @param {Array} headers additional headers to send
     * @returns {Promise<Object>} response result
     */
  async get (path, params = '', headers = []) {
    return this.request('GET', path, params, headers)
  }

  /**
     *
     * @param {string} path the path to the endpoint
     * @param {Array|string} params the parameters to send
     * @param {Array} headers additional headers to send
     * @returns {Promise<Object>} response result
     */
  async post (path, params = '', headers = []) {
    return this.request('POST', path, params, headers)
  }

  hasNewToken () { return this.userToken != null }

  createTokenInstance () { return new Remp(this.server, this.userToken, this.verbose) }
}

class RempError extends Error {
  constructor (message, data) {
    super(message)
    this.data = data
  }

  getData () { return this.data }
}

const RempUser = require('./lib/User')

module.exports = {
  Remp,
  RempError,
  RempUser
}