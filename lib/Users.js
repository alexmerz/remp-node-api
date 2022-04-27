/**
 * Represents the Users API of the CRM User module
 *
 * @class User
 * @license Apache License 2.0
 * @author Alexander Merz
 */
class Users {
  /**
     * The required Remp instance must be created using the API token
     * @param {Remp} remp request instance
     */
  constructor (remp) {
    this.remp = remp
    this.path = '/api/v1/users/'
  }

  /**
     * Wrapper for post calls, returns the response data or null in case of an error
     * @param {string} path
     * @param {Array} options
     * @returns {Object} the response data
     */
  async _postNull (path, options) {
    const response = await this.remp.post(this.path + path, options)
    if (this.remp.isSuccess(response)) {
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
  async _getNull (path, options) {
    const response = await this.remp.get(this.path + path, options)
    if (this.remp.isSuccess(response)) {
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
  async _postBoolean (path, options) {
    const response = await this.remp.post(this.path + path, options)
    if (this.remp.isSuccess(response)) {
      return true
    } else {
      return false
    }
  }

  /**
     * @link https://github.com/remp2020/crm-users-module#post-apiv1userslogin
     * @param {Array} options
     * @returns {Object} the response data
     */
  async login (options) {
    return this._postNull('login', options)
  }

  /**
     * @link https://github.com/remp2020/crm-users-module#post-apiv1userscreate
     * @param {Array} options
     * @returns {Object} the response data
     */
  async create (options) {
    return this._postNull('create', options)
  }

  /**
     * @link https://github.com/remp2020/crm-users-module#post-apiv1usersupdate
     * @param {Array} options
     * @returns {Object} the response data
     */
  async update (options) {
    return this._postNull('update', options)
  }

  /**
     * @link https://github.com/remp2020/crm-users-module#post-apiv1usersaddresses
     * @param {Array} options
     * @returns {Object} the response data
     */
  async addresses (options) {
    return this._getNull('addresses', options)
  }

  /**
     * @link https://github.com/remp2020/crm-users-module#post-apiv1usersaddress
     * @param {Array} options
     * @returns {Object} the response data
     */
  async address (options) {
    return this._postNull('address', options)
  }

  /**
     * @link https://github.com/remp2020/crm-users-module#post-apiv1usersemail
     * @param {Array} options
     * @returns {Object} the response data
     */
  async email (options) {
    return this._postNull('email', options)
  }

  /**
     * @link https://github.com/remp2020/crm-users-module#post-apiv1userslogout
     * @param {Array} options
     * @returns {booelan} true on success
     */
  async logout () {
    return this.remp._postBoolean('logout')
  }

  /**
     * @link https://github.com/remp2020/crm-users-module#post-apiv1usersaddtogroup
     * @param {Array} options
     * @returns {booelan} true on success
     */
  async addToGroup (options) {
    return this._postBoolean('add-to-group', options)
  }

  /**
     * @link https://github.com/remp2020/crm-users-module#post-apiv1usersremoveFromGroup
     * @param {Array} options
     * @returns {booelan} true on success
     */
  async removeFromGroup (options) {
    return this._postBoolean('remove-from-group', options)
  }
}

module.exports = Users
