const emailInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const failMsg = document.getElementById('failMsg');

function login() {
  const url = 'https://vue3-course-api.hexschool.io/';

  const user = {
    username: emailInput.value,
    password: passwordInput.value
  }

  axios.post(`${url}admin/signin`, user)
  .then((res) => {
    if (res.data.success) {
      let token = res.data.token;
      let expired = res.data.expired;
      document.cookie = `hextoken=${token}; expires=${new Date(expired)}`;
      window.location = 'products.html';
    } else {
      failMsg.classList.toggle('invisible');
      emailInput.value = '';
      passwordInput.value = '';
    }
    
  })
  .catch((error) => {
    failMsgMsg.textContent = String(error);
    console.log(error)
  });
}

loginBtn.addEventListener('click', login);