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

    async register(firstname, lastname, email_address, did_token, user_uuid) {
        return await api
            .post('/user/register', { firstname, lastname, email_address, did_token, user_uuid })
            .then(async (response) => {
                if (response.data.jwt_token) {
                    await TokenService.setUser(response.data);
                } else {
                    return this.login(did_token)
                }
                return response.data;
            });
    }

    async decline(user_uuid) {
        return await api
            .post('/user/decline', { user_uuid })
            .then(async (response) => {
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


    async checkEmail(email_address) {
        console.log(api);
        return await api
            .post('/user/is_registered', { email_address })
            .then(async (response) => {
                return response.data.status;
            });
    }

    //AUTHENTICATED ENDPOINTS

    async getAccountDetails() {
        return await api
            .get(`/user/account`)
            .then(async (response) => {
                return response.data;
            });
    }

    async getOperations() {
        return await api
            .get(`/user/operations`)
            .then(async (response) => {
                return response.data.operations;
            });
    }

    async updateProfile(firstname, lastname, birthdate, selfie, selfie_ext) {
        return await api
            .post('/user/account', { firstname, lastname, birthdate, selfie, selfie_ext })
            .then(async (response) => {
                if (response.data.status) {
                    let profile = JSON.parse(localStorage.getItem('user'));
                    profile.account.firstname = firstname;
                    profile.account.lastname = lastname;
                    profile.account.birthdate = birthdate;
                    profile.account.selfie = selfie;
                    profile.account.selfie_ext = selfie_ext;
                    localStorage.setItem('user', JSON.stringify(profile));
                }
                return response.data;
            });
    }

    async getUser(user_uuid) {
        return await api
            .get(`/user/account/${user_uuid}`)
            .then(async (response) => {
                return response.data.account;
            });
    }

    async searchUser(email_address) {
        return await api
            .post('/user/search', { email_address })
            .then(async (response) => {
                return response.data;
            });
    }

    async addUnreferencedBeneficiary(public_address, email_address, twoFAtoken) {
        return await api
            .post('/user/beneficiary', { public_address, email_address, "2fa_token": twoFAtoken })
            .then(async (response) => {
                return response.data;
            });
    }

    async addReferencedBeneficiary(user_uuid, twoFAtoken) {
        return await api
            .post('/user/beneficiary', { user_uuid, "2fa_token": twoFAtoken })
            .then(async (response) => {
                return response.data;
            });
    }

    async rmBeneficiary(beneficiary_uuid) {
        return await api
            .post('/user/beneficiary/remove', { beneficiary_uuid })
            .then(async (response) => {
                return response.data;
            });
    }

    async getBeneficiaries() {
        return await api
            .get('/user/beneficiary')
            .then(async (response) => {
                let beneficiaries = []
                for (let beneficiary of response.data.beneficiaries) {
                    if (beneficiary.user_uuid) {
                        const user = await this.getUser(beneficiary.user_uuid)
                        beneficiary.firstname = user.firstname
                        beneficiary.lastname = user.lastname
                        beneficiary.email_address = user.email_address
                        beneficiary.public_address = user.public_address
                        beneficiary.selfie = user.selfie
                        beneficiary.selfie_ext = user.selfie_ext
                    }
                    beneficiaries.push(beneficiary)
                }
                return beneficiaries;
            });
    }

    async claim(claim_uuid) {
        return await api
            .post('/user/claim', { claim_uuid })
            .then(async (response) => {
                return response.data;
            });
    }

    async requestAssist(message) {
        return await api
            .post('/user/assistance', { message })
            .then(async (response) => {
                return response.data;
            });
    }

    async createOrder(nb_tokens) {
        return await api
            .post('/user/purchase/order', { nb_tokens })
            .then(async (response) => {
                return response.data;
            });
    }

    async listOrders() {
        return await api
            .get('/user/purchase/order')
            .then(async (response) => {
                return response.data.orders;
            });
    }

    async initKYC() {
        return await api
            .get('/user/kyc/session')
            .then(async (response) => {
                return response.data.kyc_session_id;
            });
    }

    async detailsKYC() {
        return await api
            .get('/user/kyc/details')
            .then(async (response) => {
                return response.data;
            });
    }
}

// eslint-disable-next-line
export default new UserService();
