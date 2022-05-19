const Helper = require('./Helper');
/**
 * Represents the API of the CRM Payments module
 *
 * @class User
 * @license Apache License 2.0
 * @author Alexander Merz
 */
class RecurrentPayment {
  /**
     * The required Remp instance must be created using the user token
     * @param {Remp} remp request instance
     */
  constructor (remp) {
    this.remp = remp
    this.path = '/api/v1/recurrent-payment/'
  }

  /**
   * API call to reactivate user's recurrent payment.
   * requires User token
   * 
   * @link https://github.com/remp2020/crm-payments-module#post-apiv1recurrent-paymentreactivate
   * @param {Array} options
   * @returns {Object} the response data
   */
  async reactivate (options) {
    return Helper.postNull(this.remp, this.path + 'reactivate', options)
  }

  /**
   * API call to stop user's recurrent payment.
   * requires User token
   * 
   * @link https://github.com/remp2020/crm-payments-module#post-apiv1recurrent-paymentstop
   * @param {Array} options
   * @returns {Object} the response data
   */
  async stop (options) {
    return Helper.postNull(this.remp, this.path + 'stop', options)
  }
}

module.exports = RecurrentPayment
