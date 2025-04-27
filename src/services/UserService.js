import ApiRequestService from '@/services/ApiRequestService'
export const ADMIN_ROLE = 'admin'
export const USER_ROLE = 'role'


export default class UserService extends ApiRequestService {

    static getUserList( offset, limit, searchText = '' ) {
        let userUrl = `user/list?offset=${ offset }&limit=${ limit }&searchText=${ searchText }`;
        return this.getRequest( userUrl, {
            offset: offset,
            limit: limit
        }, {}, true );
    }


    static getUserById( userId ) {
        let userUrl = `user/detail/${userId}`;
        return this.getRequest( userUrl );
    }

    static updateUser( id, data ) {
        try {
            return this.updateRequest( 'user/update/' + id, data );
        } catch ( e ) {
            throw new Error(e.response.data.message);
        }
    }
    static getUserInfo( ) {
        try {
            return this.getRequest( 'user/my-info/' );
        } catch ( e ) {
            console.log( 'my-info error -> ', e );
        }
    }
    static async isUserAdmin() {
        const userData = await UserService.getUserInfo();
        if(!userData){
            return false;
        }
        return userData[USER_ROLE]===ADMIN_ROLE;

    }
    static addUser( data ) {
        try {
            return this.postRequest( 'user/add', data, {}, true );
        } catch ( e ) {
            throw new Error(e.response.data.message);
        }
    }

    static deleteUser( userId ) {
        try {
            return this.deleteRequest( 'user/delete/' + userId );
        } catch ( e ) {
            throw new Error(e.response.data.message);
        }
    }
}

