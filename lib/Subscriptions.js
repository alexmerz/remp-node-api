const Helper = require('./Helper')
/**
 * Represents the Subscriptions API of the CRM Subscriptions module
 *
 * @class Subscriptions
 * @license Apache License 2.0
 * @link https://github.com/remp2020/crm-subscriptions-module
 * @author Alexander Merz
 */
class Subscriptions {
  /**
       * The required Remp instance must be created using the server token
       * @param {Remp} remp request instance
       */
  constructor (remp) {
    this.remp = remp
    this.path = '/api/v1/subscriptions/'
  }

  /**
       * Creates a subscription
       * @param {Array} options
       * @returns {Object} the response data of the creation
       * @link https://github.com/remp2020/crm-subscriptions-module#post-apiv1subscriptionscreate
       */
  async create (options) {
    return Helper.postNull(this.remp, this.path + 'create', options)
  }
}

module.exports = Subscriptions
