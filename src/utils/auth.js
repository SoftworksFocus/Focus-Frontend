import { jwtDecode } from 'jwt-decode';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatarDataParaExibicao(dateString) {
  if (!dateString) {
    return 'Data não definida';
  }

  try {
    const data = parseISO(dateString); 
    return format(data, "dd 'de' MMM, HH:mm", { locale: ptBR });
  } catch (error) {
    console.error(`Erro ao formatar a data "${dateString}":`, error);
    return 'Data inválida';
  }
}

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