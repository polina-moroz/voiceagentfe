const MOCK_USER = {
  id: 1,
  name: 'Admin',
  email: 'admin@company.com',
};

const MOCK_TOKEN = 'mock-jwt-token-abc123';

export async function login(email, password) {
  await delay(600);
  if (email === 'admin@company.com' && password === 'password') {
    return { token: MOCK_TOKEN, user: MOCK_USER };
  }
  throw new Error('Invalid email or password');
}

export async function logout() {
  await delay(200);
  return { success: true };
}

export async function getMe(token) {
  await delay(300);
  if (token === MOCK_TOKEN) {
    return MOCK_USER;
  }
  throw new Error('Unauthorized');
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
