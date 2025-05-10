import {config} from '@/config/config'
import StorageService, {ACCESS_TOKEN} from '@/services/StorageService'
import {DataEmitterService} from '@/services/DataEmiterService'
import axios from 'axios'

export default class ApiRequestService {
    static axiosStatic = axios;

    static getTokenData() {
        try {
            return StorageService.getFromStorage(ACCESS_TOKEN)
        } catch (error) {
            return error
        }
    }

    static async handleRequest(method, url, data, headers = {}, responseType = null) {
        try {
            const accessToken = this.getTokenData();

            let requestConfig = {
                method,
                url: config.API_URL + url,
                data,
                headers: {
                    Authorization: accessToken,
                    ...headers,
                }
            };
            if (responseType && !responseType.isEmpty && responseType.length > 0) {
                requestConfig.responseType = responseType
            }
            DataEmitterService.$emit('showLoader', true);

            const response = await ApiRequestService.axiosStatic(requestConfig);

            DataEmitterService.$emit('showLoader', false);

            if (method === 'delete') {
                DataEmitterService.$emit('showSuccess', true);
            }

            return response.data;
        } catch (error) {
            DataEmitterService.$emit('showLoader', false);

            localStorage.setItem('error', JSON.stringify(error));

            throw new Error(error.response?.data?.message || 'An error occurred');
        }
    }

    static getRequest(url, responseType = null) {
        return this.handleRequest('get', url, null, {}, responseType);
    }

    static postRequest(url, data, headers) {
        return this.handleRequest('post', url, data, headers)
    }

    static updateRequest(url, data, headers) {
        return this.handleRequest('put', url, data, headers)
    }

    static putRequest(url, data, headers) {
        return this.handleRequest('put', url, data, headers)
    }

    static patchRequest(url, data) {
        return this.handleRequest('patch', url, data, {})
    }

    static deleteRequest(url) {
        return this.handleRequest('delete', url, null, {})
    }

    static logout() {
        DataEmitterService.$emit('showLoader', false)
        StorageService.clearAll()
        window.location.pathname = '/login'
    }

    static catchErrors(error) {
        return error
    }
}
