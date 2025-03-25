import { Api } from "telegram/tl";
import { TelegramClient } from "telegram";
//import { uploadImageToImgur } from "./imgur";
import { saveImageLocally } from "./save";
import { getUsernameFromChatId } from "./getDB";

interface LineData {
    text: string;
    links: string[];
}

interface ChannelInfo {
    title: string | null;
    username: string | null;
    photo: string | null;
    members: number | null;
}

export type SectionItemRank = {
    line1: string;
    line2: string;
    links: string[];
    line3?: {
        title: string;
        username: string;
        photo: string;
        members: number;
    };
};

export type SectionItemLine = {
    line: string;
    links: string[];
};

export type SectionItem = SectionItemRank | SectionItemLine;

export function splitMessageByLineAndEntities(
    text: string,
    entities: Api.TypeMessageEntity[] | undefined
): LineData[] {
    // Separamos o texto em linhas
    const lines = text.split("\n");

    // Calculamos o offset cumulativo de cada linha
    // Assim sabemos que a linha i vai do `start` até `end` no texto original
    const lineRanges: Array<{ start: number; end: number }> = [];
    let currentOffset = 0;

    for (const line of lines) {
        const lineLength = line.length;
        const start = currentOffset;
        const end = currentOffset + lineLength;
        lineRanges.push({ start, end });
        // +1 para contar o caractere de quebra de linha (\n)
        currentOffset = end + 1;
    }

    // Inicializa a estrutura de retorno: cada linha com um array de links vazio
    const result: LineData[] = lines.map((l) => ({ text: l, links: [] }));

    // Se não tiver entities, retornamos só o texto
    if (!entities) {
        return result;
    }

    // Para cada entity, verificamos se é um MessageEntityTextUrl
    // e descobrimos em qual linha ela se encaixa
    for (const entity of entities) {
        if (entity.className === "MessageEntityTextUrl" && "url" in entity) {
            const url = entity.url;       // URL real do hyperlink
            const startOffset = entity.offset; // Início do link no texto
            const endOffset = entity.offset + entity.length;

            // Descobrimos em qual linha esse offset cai
            for (let i = 0; i < lineRanges.length; i++) {
                const { start, end } = lineRanges[i];
                // Se (startOffset) estiver dentro do range da linha
                // ou se houver alguma sobreposição, consideramos que o link pertence a essa linha
                const overlaps =
                    (startOffset >= start && startOffset < end) ||
                    (endOffset > start && endOffset <= end);

                if (overlaps) {
                    result[i].links.push(url);
                    // Se quiser atribuir o link apenas a 1 linha (onde ele começa),
                    // pode dar um `break` aqui.
                    break;
                }
            }
        }
    }

    return result;
}

export async function getChannelInfo(
    client: TelegramClient,
    identifier: string
): Promise<ChannelInfo | null> {
    const logError = (msg: string, error?: unknown) => console.error(`${msg} para ${identifier}:`, error);

    try {
        console.log(`Tentando obter informações para identifier: ${identifier}`);
        const groupIdRegex = /^c_(\d+)$/i;
        let entity;

        if (groupIdRegex.test(identifier)) {
            const chatId = groupIdRegex.exec(identifier)![1];
            const fullChatId = BigInt(`-100${chatId}`);
            console.log(`Resolvendo chat com ID: ${fullChatId}`);

            const username = await getUsernameFromChatId(chatId.toString());
            if (!username) {
                logError(`Nenhum username encontrado para ID ${fullChatId}`);
                return null;
            }

            console.log(`Resolvendo canal com username: @${username}`);
            entity = await client.getEntity(username);
        } else {
            const url = identifier.startsWith("https://") ? new URL(identifier) : null;
            const channelUsername = url ? url.pathname.split("/")[1] : identifier;

            if (channelUsername.toLowerCase() === "defaicreatorbot") {
                console.log("Ignorando link defaicreatorbot");
                return null;
            }

            console.log(`Resolvendo entidade com username: ${channelUsername}`);
            entity = await client.getEntity(channelUsername);
        }

        if (!entity) {
            logError("Nenhuma entidade encontrada");
            return null;
        }

        console.log(`Entidade resolvida: ${entity.className}, ID: ${entity.id}`);
        let members: number | null = null;
        let title: string | null = null;
        let username: string | null = null;

        if (entity.className === "Channel" || entity.className === "ChannelForbidden") {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const full = await client.invoke(new Api.channels.GetFullChannel({ channel: entity })) as any;
            members = full.fullChat.participantsCount ?? null;
            title = full.chats[0].title ?? null;
            username = full.chats[0].username ?? null;
        } else if (entity.className === "Chat") {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const full = await client.invoke(new Api.messages.GetFullChat({ chatId: entity.id })) as any;
            members = full.fullChat.participantsCount ?? null;
            title = full.chats[0].title ?? null;
            username = null;
        } else {
            logError(`Tipo de entidade não suportado: ${entity.className}`);
            return null;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hasPhoto = (ent: any): ent is Api.Channel | Api.Chat => "photo" in ent && ent.photo !== null;
        let photoUrl: string | null = null;

        if (hasPhoto(entity)) {
            const photoCandidate = await client.downloadProfilePhoto(entity);
            if (photoCandidate) {
                const photoBuffer = typeof photoCandidate === "string" ? Buffer.from(photoCandidate) : photoCandidate;
                photoUrl = await saveImageLocally(photoBuffer);
            }
        }

        const photo = photoUrl ?? null;
        console.log(`Informações obtidas: title=${title}, username=${username}, members=${members}`);
        return { title, username, photo, members };
    } catch (error) {
        logError("Erro ao obter informações do canal", error);
        return null;
    }
}

const channelInfoCache = new Map<string, ChannelInfo>();

export async function parseDefaiCreatorMessage(
    client: TelegramClient,
    text: string,
    entities: Api.TypeMessageEntity[] | undefined
): Promise<Record<string, SectionItem[]>> {
    const lines = text.split("\n");
    const lineRanges: Array<{ start: number; end: number }> = [];
    let currentOffset = 0;
    for (const line of lines) {
        const start = currentOffset;
        const end = start + line.length;
        lineRanges.push({ start, end });
        currentOffset = end + 1;
    }

    const linesData = lines.map((l) => ({ text: l, links: [] as string[] }));

    if (entities) {
        for (const entity of entities) {
            if (entity.className === "MessageEntityTextUrl" && "url" in entity) {
                const url = entity.url;
                const startOffset = entity.offset;
                const endOffset = startOffset + entity.length;
                for (let i = 0; i < lineRanges.length; i++) {
                    const { start, end } = lineRanges[i];
                    if ((startOffset >= start && startOffset < end) || (endOffset > start && endOffset <= end)) {
                        linesData[i].links.push(url);
                        break;
                    }
                }
            }
        }
    }

    const knownTitles = [
        "Best Calls of Last 24 Hours",
        "Best Calls of Last Week",
        "Best Calls of Last Month",
        "Best Callers of Last 24 Hours",
        "Best Callers of Last Week",
        "Best Callers of Last Month",
        "Latest Calls",
        "Trending Tokens",
    ];
    const titleRegex = new RegExp(
        knownTitles.map((t) => `(${escapeRegex(t)})`).join("|"),
        "i"
    );
    const rankRegex = /^\d+\.\s+/;
    const ignorePatterns = [
        "[📞 Unique Calls in Last 24 Hours]",
        "[🔥 Unique Calls in Last 60 Mins]",
        "[🎯Sorted by Median ATH X]",
        "[AT LEAST 2 CALLS OR MORE]",
        "[AT LEAST 4 CALLS OR MORE]",
    ];

    const result: Record<string, SectionItem[]> = {};
    let currentTitle = "";
    let i = 0;
    while (i < linesData.length) {
        const { text: currentLine, links: currentLinks } = linesData[i];

        if (!currentLine.trim() || ignorePatterns.some((pattern) => currentLine.includes(pattern))) {
            i++;
            continue;
        }

        const matchTitle = currentLine.match(titleRegex);
        if (matchTitle) {
            currentTitle = matchTitle[0].trim();
            result[currentTitle] = [];
            i++;
            continue;
        }

        if (currentTitle) {
            let item: SectionItem;
            // eslint-disable-next-line prefer-const
            let line1 = currentLine;
            let line2 = "";
            let combinedLinks = [...currentLinks];

            const nextIndex = i + 1;
            if (nextIndex < linesData.length) {
                const nextLine = linesData[nextIndex];
                const isNextLineRank = rankRegex.test(nextLine.text);
                const isNextLineTitle = titleRegex.test(nextLine.text);
                if (!isNextLineRank && !isNextLineTitle && nextLine.text.trim() !== "") {
                    line2 = nextLine.text;
                    combinedLinks = [...combinedLinks, ...nextLine.links];
                    i++;
                }
            }

            const channelLinkRegex = /^https:\/\/t\.me\/([^\/]+)\/\d+/i;
            const groupIdRegex = /^c_(\d+)$/i;
            const botLinkRegex = /https:\/\/t\.me\/defaicreatorbot\?start=(c_\d+)/i;

            let identifier: string | undefined;
            const channelOrGroupLink = combinedLinks.find((link) => {
                const channelMatch = link.match(channelLinkRegex);
                if (channelMatch && channelMatch[1].toLowerCase() !== "defaicreatorbot") {
                    identifier = channelMatch[1];
                    return true;
                }
                const groupMatch = link.match(groupIdRegex);
                if (groupMatch) {
                    identifier = link;
                    return true;
                }
                const botMatch = link.match(botLinkRegex);
                if (botMatch) {
                    identifier = botMatch[1];
                    return true;
                }
                return false;
            });

            let line3;
            if (channelOrGroupLink && identifier) {
                if (channelInfoCache.has(identifier)) {
                    line3 = channelInfoCache.get(identifier);
                } else {
                    const info = await getChannelInfo(client, identifier);
                    if (info) {
                        line3 = {
                            title: info.title || "N/A",
                            username: info.username || "N/A",
                            photo: info.photo || "N/A",
                            members: info.members ?? 0,
                        };
                        channelInfoCache.set(identifier, line3);
                    }
                }
            }

            if (rankRegex.test(line1)) {
                item = { line1, line2, links: combinedLinks };
                if (line3) {
                    (item as SectionItemRank).line3 = {
                        title: line3.title || "N/A",
                        username: line3.username || "N/A",
                        photo: line3.photo || "N/A",
                        members: line3.members ?? 0,
                    };
                }
            } else {
                item = { line: line1, links: combinedLinks };
                if (line3) {
                    (item as unknown as SectionItemRank).line3 = {
                        title: line3.title || "N/A",
                        username: line3.username || "N/A",
                        photo: line3.photo || "N/A",
                        members: line3.members ?? 0,
                    };
                }
            }

            result[currentTitle].push(item);
        }
        i++;
    }

    return result;
}


/**
 * Função auxiliar para escapar caracteres especiais em regex.
 */
function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
//