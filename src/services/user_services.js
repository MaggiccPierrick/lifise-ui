import api from './api';
import TokenService from './token_services';

class UserService {
    async login(did_token) {
        return await api
            .post('/user/login', { did_token })
            .then(async (response) => {
                if (response.data.jwt_token) {
                    await TokenService.setUser(response.data);
                }
                return response.data;
            });
    }

    async logout() {
        try {
            return await api
                .get('/logout')
                .then(async () => {
                    await TokenService.removeUser();
                });
        } catch (e) {
            console.error(e);
            await TokenService.removeUser();
        }
    }

    //AUTHENTICATED ENDPOINTS

    async updateProfile(firstname, lastname, birthdate) {
        return await api
            .post('/user/account', { firstname, lastname, birthdate })
            .then(async (response) => {
                if (response.data.status) {
                    let profile = JSON.parse(localStorage.getItem('user'));
                    profile.account.firstname = firstname;
                    profile.account.lastname = lastname;
                    profile.account.birthdate = birthdate;
                    localStorage.setItem('user', JSON.stringify(profile));
                }
                return response.data;
            });
    }
}

// eslint-disable-next-line
export default new UserService();
