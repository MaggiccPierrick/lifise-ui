import api from './api';
import TokenService from './token_services';

class AdminService {
  async login(login, password) {
    return await api
      .post('/admin/login', { login, password })
      .then(async (response) => {
        return response.data;
      });
  }

  async login2fa(login, password, token) {
    return await api
      .post('admin/login', { login, password, "2fa_token": token })
      .then(async (response) => {
        if (response.data.jwt_token) {
          await TokenService.setUser(response.data);
        }
        return response.data;
      });
  }

  async sendReset(email_address) {
    return await api
      .post('/admin/password/reset/token', { email_address })
      .then(async (response) => {
        return response.data;
      });
  }

  async resetPswd(email_address, password, reset_token) {
    return await api
      .post('/admin/password/reset', { email_address, password, reset_token })
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

  async getCurrentUser() {
    return await TokenService.getUser();
  }

  //AUTHENTICATED ENDPOINTS
  async getAdmins(deactivated = false) {
    return await api
      .get(`/admin?deactivated=${deactivated}`)
      .then(async (response) => {
        return response.data.admin_accounts;
      });
  }

  async deactivate(admin_uuid) {
    return await api
      .post('/admin/deactivate', { admin_uuid })
      .then(async (response) => {
        return response.data;
      });
  }

  async reactivate(admin_uuid) {
    return await api
      .post('/admin/reactivate', { admin_uuid })
      .then(async (response) => {
        return response.data;
      });
  }

  async createAdmin(email_address, firstname, lastname) {
    return await api
      .post('/admin/create', { email_address, firstname, lastname })
      .then(async (response) => {
        return response.data;
      });
  }

  async getUsers(deactivated = false, pending = false) {
    return await api
      .get(`/admin/users?deactivated=${deactivated}&pending=${pending}`)
      .then(async (response) => {
        return response.data.user_accounts;
      });
  }

  async getUser(user_uuid) {
    return await api
      .get(`/admin/users/${user_uuid}`)
      .then(async (response) => {
        return response.data.user_details;
      });
  }

  async deactivateUser(user_uuid) {
    return await api
      .post('/admin/user/deactivate', { user_uuid })
      .then(async (response) => {
        return response.data;
      });
  }

  async reactivateUser(user_uuid) {
    return await api
      .post('/admin/user/reactivate', { user_uuid })
      .then(async (response) => {
        return response.data;
      });
  }

  async updateProfile(firstname, lastname) {
    return await api
      .post('/admin/account', { firstname, lastname })
      .then(async (response) => {
        if (response.data.status) {
          let profile = JSON.parse(localStorage.getItem('user'));
          profile.account.firstname = firstname;
          profile.account.lastname = lastname;
          localStorage.setItem('user', JSON.stringify(profile));
        }
        return response.data;
      });
  }

  async updateEmail(email_address) {
    return await api
      .post('/admin/account', { email_address })
      .then(async (response) => {
        if (response.data.status) {
          let profile = JSON.parse(localStorage.getItem('user'));
          profile.account.email_address = email_address;
          localStorage.setItem('user', JSON.stringify(profile));
        }
        return response.data;
      });
  }

  async updatePassword(old_password, new_password) {
    return await api
      .post('/admin/account', { old_password, new_password })
      .then(async (response) => {
        return response.data;
      });
  }

  async inviteUsers(emails_list, claimable_tokens = 0) {
    return await api
      .post('/admin/user/invite', { emails_list, claimable_tokens })
      .then(async (response) => {
        return response.data;
      });
  }
  
  async getAdminBalance() {
    return await api
      .get(`/admin/wallet/balance`)
      .then(async (response) => {
        return response.data;
      });
  }
  
  async generateGA() {
    return await api
      .get(`/admin/totp/generate`)
      .then(async (response) => {
        return response.data;
      });
  }

  async activateGA(totp_token) {
    return await api
      .post('/admin/totp/activate', { totp_token })
      .then(async (response) => {
        return response.data;
      });
  }
  
  async listOrders(pending = false) {
    return await api
      .get(`/admin/user/purchase/order?pending=${pending}`)
      .then(async (response) => {
        return response.data;
      });
  }
  
  async validateOrder(user_uuid, user_purchase_uuid, amount_received) {
    return await api
      .post(`/admin/user/purchase/order/confirm`, {user_uuid, user_purchase_uuid, amount_received})
      .then(async (response) => {
        return response.data;
      });
  }

}

// eslint-disable-next-line
export default new AdminService();
