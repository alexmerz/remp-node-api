/**
 * Represents the User API of the CRM User module
 *
 * @class User
 * @license Apache License 2.0
 * @author Alexander Merz
 */
class User {
  /**
     * The required Remp instance must be created using the user token
     * @param {Remp} remp request instance
     */
  constructor (remp) {
    this.remp = remp
    this.path = '/api/v1/user/'
  }

  /**
     * Returns the user data
     * @returns {Object} the user data
     * @link https://github.com/remp2020/crm-users-module#get-apiv1userinfo
     */
  async info () {
    const info = await this.remp.get(this.path + 'info')
    if (this.remp.isSuccess(info)) {
      return info
    } else {
      return null
    }
  }

  /**
     * Deletes the user
     * @returns {boolean} true if the user has been deleted
     * @link https://github.com/remp2020/crm-users-module#post-apiv1userdelete
     */
  async delete () {
    try {
      const result = await this.remp.get(this.path + 'delete')
      if (!this.remp.isSuccess(result)) { // this is some illogic, we only end up here, if the delete fails
        return false
      }
    } catch (e) {
      // is thrown if status code was also 203 which is success in this case.
      if (e.message === 'http-failure') {
        const data = e.getData()
        if (data.statusCode === 203) {
          return true
        }
        throw e
      }
      throw e
    }
  }
}

module.exports = User
