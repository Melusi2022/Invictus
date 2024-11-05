async function signup() {
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;

  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();
  document.getElementById('signup-message').innerText = data.message;
}

async function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
    document.getElementById('login-message').innerText = "Logged in successfully!";
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('user-details-section').style.display = 'block';
  } else {
    document.getElementById('login-message').innerText = data.message;
  }
}

async function getUserDetails() {
  const token = localStorage.getItem('token');
  const response = await fetch('/api/auth/user-details', {
    headers: { Authorization: `Bearer ${token}` }
  });

  const user = await response.json();
  document.getElementById('user-details').innerText = `Hello, ${user.username}`;
}

function logout() {
  localStorage.removeItem('token');
  document.getElementById('login-section').style.display = 'block';
  document.getElementById('user-details-section').style.display = 'none';
}
