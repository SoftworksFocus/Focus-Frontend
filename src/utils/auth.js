import { jwtDecode } from 'jwt-decode';

export function getUserIdFromToken() {
  const token = localStorage.getItem('authToken'); 

  if (!token) {
    console.error("Token de autenticação não encontrado.");
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);

    const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] 
                || decodedToken.sub 
                || decodedToken.nameid;

    if (!userId) {
        console.error("Nenhuma claim de ID de usuário (nameidentifier, sub, nameid) foi encontrada no token.");
        return null;
    }

    return userId;

  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
}