import { Api } from "telegram/tl";

interface LineData {
    text: string;
    links: string[];
}

export type SectionItem =
    // Caso seja um "par" de linhas (ranking + detalhe)
    {
        line1: string;
        line2: string;
        links: string[];
    }
    // Caso seja apenas uma linha “solta”
    | {
        line: string;
        links: string[];
    };

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

export function parseDefaiCreatorMessage(
    text: string,
    entities: Api.TypeMessageEntity[] | undefined
): Record<string, SectionItem[]> {
    // 1) Dividir texto em linhas + mapear offsets
    const lines = text.split("\n");
    const lineRanges: Array<{ start: number; end: number }> = [];

    let currentOffset = 0;
    for (const line of lines) {
        const start = currentOffset;
        const end = start + line.length;
        lineRanges.push({ start, end });
        currentOffset = end + 1; // +1 para o '\n'
    }

    // 2) Inicializa estrutura de cada linha com seu texto e links = []
    const linesData = lines.map((l) => ({ text: l, links: [] as string[] }));

    // 3) Se houver entities, associar cada hyperlink (MessageEntityTextUrl) à linha correta
    if (entities) {
        for (const entity of entities) {
            if (entity.className === "MessageEntityTextUrl" && "url" in entity) {
                const url = entity.url;
                const startOffset = entity.offset;
                const endOffset = startOffset + entity.length;

                // Descobrimos qual linha corresponde ao offset
                for (let i = 0; i < lineRanges.length; i++) {
                    const { start, end } = lineRanges[i];
                    const overlaps =
                        (startOffset >= start && startOffset < end) ||
                        (endOffset > start && endOffset <= end);

                    if (overlaps) {
                        linesData[i].links.push(url);
                        // Se quiser que cada link apareça só na 1ª linha que ele ocupa, use break.
                        break;
                    }
                }
            }
        }
    }

    // 4) Definimos títulos conhecidos
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

    // Regex para detectar se uma linha é um desses títulos
    const titleRegex = new RegExp(
        knownTitles.map((t) => `(${escapeRegex(t)})`).join("|"),
        "i"
    );

    // Regex para detectar se a linha é "ranking" (ex.: "1.   🔗 ...")
    // Ajuste se o padrão for diferente.
    const rankRegex = /^\d+\.\s+/;

    const ignorePatterns = [
        "[📞 Unique Calls in Last 24 Hours]",
        "[🔥 Unique Calls in Last 60 Mins]",
        "[🎯Sorted by Median ATH X]",
        "[AT LEAST 2 CALLS OR MORE]",
        "[AT LEAST 4 CALLS OR MORE]",
    ];

    // 5) Percorrer as linhas e agrupar em seções por título
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

        // Tenta casar com algum título
        const matchTitle = currentLine.match(titleRegex);
        if (matchTitle) {
            currentTitle = matchTitle[0].trim();
            if (!result[currentTitle]) {
                result[currentTitle] = [];
            }
            i++;
            continue;
        }

        // Se não for título, mas estiver em alguma seção
        if (currentTitle) {
            // Verifica se a linha bate com o "rankRegex" (ex.: "1.   🔗 ...")
            if (rankRegex.test(currentLine)) {
                // É uma linha de rank => line1
                // eslint-disable-next-line prefer-const
                let line1 = currentLine;
                let line2 = "";
                let combinedLinks = [...currentLinks];

                // Verifica a próxima linha, se existe e não for outro rank/título
                const nextIndex = i + 1;
                if (nextIndex < linesData.length) {
                    const nextLine = linesData[nextIndex];
                    // Verifica se a próxima linha não casa com rankRegex nem é título
                    // e também não está vazia (caso você queira ignorar vazias).
                    const isNextLineRank = rankRegex.test(nextLine.text);
                    const isNextLineTitle = titleRegex.test(nextLine.text);

                    if (!isNextLineRank && !isNextLineTitle && nextLine.text !== "") {
                        // Usa a próxima linha como line2
                        line2 = nextLine.text;
                        combinedLinks = [...combinedLinks, ...nextLine.links];
                        i++; // pula a próxima linha também
                    }
                }

                // Cria o objeto com line1, line2, links
                result[currentTitle].push({
                    line1,
                    line2,
                    links: combinedLinks,
                });
            } else {
                // Linha normal (pode ser vazia ou algum texto extra).
                // Se quiser descartar linhas vazias, cheque currentLine !== "".
                result[currentTitle].push({
                    line: currentLine,
                    links: currentLinks,
                });
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