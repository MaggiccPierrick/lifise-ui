class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.refresh_token;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.jwt_token;
  }

  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem('user'));
    user.jwt_token = token;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    if (localStorage.getItem('user')) return JSON.parse(localStorage.getItem('user'));
    else window.location.href = '/signin';
  }

  isUser() {
    if (localStorage.getItem('user'))
      return true
    else
      return false
  }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeUser() {
    const user = JSON.parse(localStorage.getItem('user'))
    localStorage.removeItem('user')
    window.location.href = user.account.admin_uuid ? '/admin/signin' : '/signin'
  }
}

// eslint-disable-next-line
export default new TokenService();