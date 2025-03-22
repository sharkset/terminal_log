import { Api } from "telegram/tl";
import { TelegramClient } from "telegram";
//import { uploadImageToImgur } from "./imgur";
import { saveImageLocally } from "./save";

interface LineData {
    text: string;
    links: string[];
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
    link: string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ title: string | null; username: string | null; photo: string | null; members: number | null } | null> {
    try {
        const url = new URL(link);
        const segments = url.pathname.split("/").filter(Boolean);
        if (segments.length < 1) {
            console.error("Link inválido:", link);
            return null;
        }
        const channelUsername = segments[0];

        if (channelUsername.toLowerCase() === "defaicreatorbot") {
            console.log("Ignorando link defaicreatorbot");
            return null;
        }

        const entity = await client.getEntity(channelUsername);

        let members: number | null = null;
        let title: string | null = null;
        let username: string | null = null;
        if (entity.className === "Channel" || entity.className === "ChannelForbidden" || entity.className === "ChatEmpty") {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const full: any = await client.invoke(
                new Api.channels.GetFullChannel({ channel: entity })
            );
            //console.log("full", full);
            members = full.fullChat.participantsCount || null;
            title = full.chats[0].title || null;
            username = full.chats[0].username || null;
        } else if (entity.className === "Chat") {
            members = null;
            title = null;
            username = null;
        }

        // Type guard para verificar se a entidade possui a propriedade 'photo'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hasPhoto = (ent: any): ent is { photo: any } => {
            return "photo" in ent;
        };

        let photoUrl: string | null = null;

        if (hasPhoto(entity)) {
            const photoCandidate = await client.downloadProfilePhoto(entity);
            if (photoCandidate) {
                // Converte para Buffer se necessário
                const photoBuffer =
                    typeof photoCandidate === "string"
                        ? Buffer.from(photoCandidate)
                        : photoCandidate;
                // Faz o upload para o Imgur e obtém o link
                //photoUrl = await uploadImageToImgur(photoBuffer);
                photoUrl = await saveImageLocally(photoBuffer);
            }
        }

        const photo = photoUrl || null;
        //console.log(title, username, photo, members)
        return { title, username, photo, members };
    } catch (error) {
        console.error("Erro ao obter informações do canal:", error);
        return null;
    }
}

export async function parseDefaiCreatorMessage(
    client: TelegramClient,
    text: string,
    entities: Api.TypeMessageEntity[] | undefined
): Promise<Record<string, SectionItem[]>> {
    // 1) Dividir o texto em linhas e calcular os offsets
    const lines = text.split("\n");
    const lineRanges: Array<{ start: number; end: number }> = [];
    let currentOffset = 0;
    for (const line of lines) {
        const start = currentOffset;
        const end = start + line.length;
        lineRanges.push({ start, end });
        currentOffset = end + 1; // +1 para o '\n'
    }

    // 2) Inicializa a estrutura para cada linha (texto e links vazios)
    const linesData = lines.map((l) => ({ text: l, links: [] as string[] }));

    // 3) Se houver entities, associe cada hyperlink (MessageEntityTextUrl) à linha correspondente
    if (entities) {
        for (const entity of entities) {
            if (entity.className === "MessageEntityTextUrl" && "url" in entity) {
                const url = entity.url;
                const startOffset = entity.offset;
                const endOffset = startOffset + entity.length;
                for (let i = 0; i < lineRanges.length; i++) {
                    const { start, end } = lineRanges[i];
                    const overlaps =
                        (startOffset >= start && startOffset < end) ||
                        (endOffset > start && endOffset <= end);
                    if (overlaps) {
                        linesData[i].links.push(url);
                        break;
                    }
                }
            }
        }
    }

    // 4) Definimos os títulos conhecidos e as regex para título e ranking
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

    // 5) Agrupar as linhas em seções por título
    const result: Record<string, SectionItem[]> = {};
    let currentTitle = "";
    let i = 0;
    while (i < linesData.length) {
        const { text: currentLine, links: currentLinks } = linesData[i];

        if (!currentLine.trim()) {
            i++;
            continue;
        }
        if (ignorePatterns.some((pattern) => currentLine.includes(pattern))) {
            i++;
            continue;
        }

        // Se a linha casa com algum título conhecido, atualizamos o título corrente
        const matchTitle = currentLine.match(titleRegex);
        if (matchTitle) {
            currentTitle = matchTitle[0].trim();
            if (!result[currentTitle]) {
                result[currentTitle] = [];
            }
            i++;
            continue;
        }

        // Se estivermos dentro de uma seção (título definido)
        if (currentTitle) {
            // Se a linha corresponde ao padrão de ranking (ex.: "1.   🔗 ...")
            if (rankRegex.test(currentLine)) {
                // eslint-disable-next-line prefer-const
                let line1 = currentLine;
                let line2 = "";
                let combinedLinks = [...currentLinks];

                // Verifica se a próxima linha pode ser usada como detalhes (line2)
                const nextIndex = i + 1;
                if (nextIndex < linesData.length) {
                    const nextLine = linesData[nextIndex];
                    const isNextLineRank = rankRegex.test(nextLine.text);
                    const isNextLineTitle = titleRegex.test(nextLine.text);
                    if (!isNextLineRank && !isNextLineTitle && nextLine.text.trim() !== "") {
                        line2 = nextLine.text;
                        combinedLinks = [...combinedLinks, ...nextLine.links];
                        i++; // pula a linha de detalhes já utilizada
                    }
                }

                const item: SectionItemRank = { line1, line2, links: combinedLinks };

                // Verifica se dentre os links há algum que seja um link de canal Telegram
                const channelLinkRegex = /^https:\/\/t\.me\/([^\/]+)\/\d+/i;
                const channelLink = combinedLinks.find((link) => {
                    const match = link.match(channelLinkRegex);
                    return match ? match[1].toLowerCase() !== "defaicreatorbot" : false;
                });
                if (channelLink) {
                    // Obter informações do canal (foto e número de participantes)
                    const info = await getChannelInfo(client, channelLink);
                    if (info) {
                        item.line3 = {
                            title: info.title || "N/A",
                            username: info.username || "N/A",
                            photo: info.photo || "N/A",
                            members: info.members !== null ? info.members : 0
                        };
                    }
                }
                result[currentTitle].push(item);
            } else {
                // Se não for ranking, armazena como linha solta
                result[currentTitle].push({ line: currentLine, links: currentLinks });
            }
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