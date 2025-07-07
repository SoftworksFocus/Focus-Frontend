import { jwtDecode } from 'jwt-decode';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatarDataParaExibicao(dateString) {
  console.log('Tentando formatar a seguinte data:', dateString);
  if (!dateString) {
    return 'Data não definida';
  }

  try {
    const data = parse(dateString, 'dd/MM/yyyy HH:mm', new Date(), { locale: ptBR });
     return format(data, "dd 'de' MMM 'de' yyyy, HH:mm", { locale: ptBR });
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