export const saveUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userExists = users.find(u => u.email === email);
  if (!userExists) {
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }
  return false; // User already exists
};

export const checkCredentials = (email, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users.some(u => u.email === email && u.password === password);
};

export const loginUser = (email) => {
  localStorage.setItem('currentUser', email);
};

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = () => {
  return localStorage.getItem('currentUser');
};
