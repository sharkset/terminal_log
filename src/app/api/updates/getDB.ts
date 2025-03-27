import { pgPool } from './db';

interface ChatData {
  telegram_id: string;
  telegram_handle: string;
}

let chatsCache: ChatData[] = [];

function updateChatsCache(newData: ChatData[]) {
  chatsCache = newData;
}

async function refreshChatsCache() {
  try {
    const result = await pgPool.query('SELECT telegram_id, telegram_handle FROM chats');
    updateChatsCache(result.rows);
    console.log(`[CACHE] chatsCache atualizado com ${result.rows.length} registros`);
  } catch (err) {
    console.error('[CACHE] Erro ao atualizar chatsCache:', err);
  }
}

export async function getUsernameFromChatId(chatId: string): Promise<string | null> {
  if (!chatsCache.length) {
    await refreshChatsCache();
  }
  const match = chatsCache.find(chat => chat.telegram_id === chatId);
  return match ? match.telegram_handle : null;
}

setInterval(refreshChatsCache, 1 * 60 * 1000); // atualiza a cada 1 minutos
//