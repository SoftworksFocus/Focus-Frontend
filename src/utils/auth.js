import { jwtDecode } from 'jwt-decode';

function getClaimFromToken(claim) {
  const token = localStorage.getItem('authToken');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken[claim];
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }
  return null;
}

export function getUserIdFromToken() {
  return getClaimFromToken('nameid');
}

export function getLoggedInUsername() {
  return getClaimFromToken('unique_name');
}