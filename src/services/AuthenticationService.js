import StorageService, {
  ACCESS_TOKEN,
} from '@/services/StorageService'
import ApiRequestService from '@/services/ApiRequestService'

export default class AuthenticationService extends ApiRequestService {
  static signIn(data) {
    return new Promise((resolve, reject) => {
      this.postRequest('auth/sign-in', {
        email: data.email,
        password: data.password,
      }, {}, true).then(responseData => {
        if (responseData?.token) {
          StorageService.setToStorage(ACCESS_TOKEN, responseData.token)

          return resolve(true)
        }

        return resolve(false)
      }).catch(error => {
        reject(error);
      });
    })
  }

  static logOut() {
    return new Promise(resolve => {
      this.logout();
      resolve(true);
    })
  }


  static isAuthenticated() {
    return !!StorageService.getFromStorage(ACCESS_TOKEN)
  }
}
