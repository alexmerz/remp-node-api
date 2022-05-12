/**
 * Helper class for processing request reponses
 */
class Helper {
  /**
     * Wrapper for post calls, returns the response data or null in case of an error
     * @param {string} path
     * @param {Array} options
     * @returns {Object} the response data
     */
  async postNull (remp, path, options) {
    const response = await remp.post(path, options)
    if (remp.isSuccess(response)) {
      return response
    } else {
      return null
    }
  }

  /**
     * Wrapper for get calls, returns the response data or null in case of an error
     * @param {string} path
     * @param {Array} options
     * @returns {Object} the response data
     */
  async getNull (remp, path, options) {
    const response = await remp.get(path + path, options)
    if (remp.isSuccess(response)) {
      return response
    } else {
      return null
    }
  }

  /**
     * Wrapper for post calls, returns ether true or false
     * @param {string} path
     * @param {Array} options
     * @returns {booelan} true on success
     */
  async postBoolean (remp, path, options) {
    const response = await remp.post(path + path, options)
    if (remp.isSuccess(response)) {
      return true
    } else {
      return false
    }
  }
}

module.exports = Helper
