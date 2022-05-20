const Helper = require('./Helper')

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
     * @link https://github.com/remp2020/crm-users-module#post-apiv1userslogin
     * @param {Array} options
     * @returns {Object} the response data
     */
  async login (options) {
    return Helper.postNull(this.remp, this.path + 'login', options)
  }

  /**
     * @link https://github.com/remp2020/crm-users-module#post-apiv1userscreate
     * @param {Array} options
     * @returns {Object} the response data
     */
  async create (options) {
    return Helper.postNull(this.remp, this.path + 'create', options)
  }

  /**
     * @link https://github.com/remp2020/crm-users-module#post-apiv1usersupdate
     * @param {Array} options
     * @returns {Object} the response data
     */
  async update (options) {
    return Helper.postNull(this.remp, this.path + 'update', options)
  }

  /**
     * @link https://github.com/remp2020/crm-users-module#post-apiv1usersaddresses
     * @param {Array} options
     * @returns {Object} the response data
     */
  async addresses (options) {
    return Helper.getNull(this.remp, this.path + 'addresses', options)
  }

  /**
     * @link https://github.com/remp2020/crm-users-module#post-apiv1usersaddress
     * @param {Array} options
     * @returns {Object} the response data
     */
  async address (options) {
    return Helper.postNull(this.remp, this.path + 'address', options)
  }

  /**
     * @link https://github.com/remp2020/crm-users-module#post-apiv1usersemail
     * @param {Array} options
     * @returns {Object} the response data
     */
  async email (options) {
    return await this.remp.post(this.path + 'email', options)
  }

  /**
     * @link https://github.com/remp2020/crm-users-module#post-apiv1userslogout
     * @param {Array} options
     * @returns {boolean} true on success
     */
  async logout () {
    return Helper.postBoolean(this.remp, this.path + 'logout')
  }

  /**
     * @link https://github.com/remp2020/crm-users-module#post-apiv1usersaddtogroup
     * @param {Array} options
     * @returns {boolean} true on success
     */
  async addToGroup (options) {
    return Helper.postBoolean(this.remp, this.path + 'add-to-group', options)
  }

  /**
     * @link https://github.com/remp2020/crm-users-module#post-apiv1usersremoveFromGroup
     * @param {Array} options
     * @returns {boolean} true on success
     */
  async removeFromGroup (options) {
    return Helper.postBoolean(this.remp, this.path + 'remove-from-group', options)
  }

  /**
     * @link https://github.com/remp2020/crm-subscriptions-module#get-apiv1userssubscriptions
     * @param {Array} options
     * @returns {Object} response data
     */
  async subscriptions (options) {
    return Helper.postNull(this.remp, this.path + 'subscriptions', options)
  }

  /**
   * API call returns list of all user's recurrent payments
   * requries user token
   * @link https://github.com/remp2020/crm-payments-module#get-apiv1usersrecurrent-payments   
   * @returns {Object} response data
   */
  async recurrentPayments (options = {}) {
    // this api call uses PHP style array passing via GET url parameters
    let urlparams = "";
    const getparams = [];
    if(options.chargeable_from) {
      getparams.push('chargeable_from=' + options.chargeable_from);
    }
    if(options.states) {
      if(Array.isArray(options.states)) { // if states is array add multiple states 
        for(let i = 0; i < options.states.length; i++) {
          getparams.push('state[]=' + options.states[i]);
        }        
      } else { // assume it's only a string
        getparams.push('state[]=' + options.states);
      }
    }

    if(getparams.length > 0) {
      urlparams = "?" + getparams.join("&");
    }
    return await this.remp.get(this.path + 'recurrent-payments'+urlparams);    
  }
}

module.exports = Users
