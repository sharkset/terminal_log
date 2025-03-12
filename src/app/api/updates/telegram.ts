import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { Api } from "telegram/tl";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import input from "input";

const apiId = parseInt("29146226");
const apiHash = "ebee06a79cee29551dd77efa3724cfcc";
const monitoredGroupId = parseInt("-1002183645523"); // Grupo público com mensagens de bots
const monitoredBotId = parseInt("7756548901"); // ID do bot que envia as mensagens

const sessionString = "1AZWarzkBu6z0sFDhYeBVQdTBgIcpBnvXEcx2wEp8cT0argYGJ47NQfpfL-flQOXwg6kCASCxjLfdTlXXvj52F8q6ikQw36pBnsngh_6uigZmOSGmor6iuI6qg9vD3n0ARuWi_QU9Inex3lfkr7PojeqyaxM8rG_V8Ivt9XFPiEULrRkK61KTYNmJZzYfLGeJP5uJrrSKBl9gadH-7OcBYlp9hegq34Dl8qjXOkio-CiczBcfIJxoWU6JWNIh-GsfbSybjgzpcg1xO6EGZRb3zUXeds7KwKYp-sejN4_zrMLzh9HnRqlqDgPpwG1B-x-tF1O_NZMTfsUxAM7dT_QvdeqtelntWr8="; // String de sessão do usuário
const saveSession = "1AQAOMTQ5LjE1NC4xNzUuNTcBu6z0sFDhYeBVQdTBgIcpBnvXEcx2wEp8cT0argYGJ47NQfpfL+flQOXwg6kCASCxjLfdTlXXvj52F8q6ikQw36pBnsngh/6uigZmOSGmor6iuI6qg9vD3n0ARuWi/QU9Inex3lfkr7PojeqyaxM8rG/V8Ivt9XFPiEULrRkK61KTYNmJZzYfLGeJP5uJrrSKBl9gadH+7OcBYlp9hegq34Dl8qjXOkio+CiczBcfIJxoWU6JWNIh+GsfbSybjgzpcg1xO6EGZRb3zUXeds7KwKYp+sejN4/zrMLzh9HnRqlqDgPpwG1B+x+tF1O/NZMTfsUxAM7dT/QvdeqtelntWr8="; // String de sessão do usuário
const client = new TelegramClient(new StringSession(saveSession ? saveSession : sessionString), apiId, apiHash, { connectionRetries: 5 });

// Lista de tópicos que queremos monitorar
const monitoredThreads = [
    237, 1017214, 816408, 105460, 1, 910, 816414, 106458, 137696
];

const MAX_LOGS = 1000;
export const logs: string[] = [];



// eslint-disable-next-line @typescript-eslint/no-explicit-any
function customLog(...args: any[]) {
    const message = args.join(" ");
    if (logs.length >= MAX_LOGS) {
        logs.shift(); // remove o log mais antigo
    }
    logs.push(message);
    console.log(message);
}

function generateFakeLogs() {
    const logTypes = [
        "INFO", "WARNING", "ERROR", "DEBUG", "SECURITY", "SYSTEM"
    ];

    function generateRandomLogMessage() {
        const actions = ["Initializing", "Processing", "Validating", "Executing", "Scanning", "Updating", "Loading", "Checking", "Retrieving", "Connecting"];
        const subjects = ["database", "network", "user session", "API request", "security module", "disk storage", "configuration", "authentication", "logs", "server instance"];
        const results = ["completed successfully.", "encountered an issue!", "is taking longer than expected.", "requires manual intervention.", "was interrupted.", "is now online.", "failed to respond.", "is running optimally.", "detected an anomaly.", "needs a restart.",
            "Scanning brand new tokens on $SOL",
            "Scanning brand new tokens on $ETH",
            "Scanning brand new tokens on $BASE",
            "Scanning brand new tokens on $TON",
            "Creating patterns for low-performance tokens",
            "Eliminating patterns for low-performance tokens (2x-)",
            "Creating patterns for medium-performance tokens (2x+)",
            "Creating patterns for high-performance tokens (10x+), Updating machine learning filters for Seekai Research",
            "Updating machine learning filters for Seekai Gamble",
            "New user clicked on the @defaicreator bot",
            "New filter created – DEFAI agent created by a user, monitoring patterns and performance",
            "New filter created by a user reached medium-performance token metrics, archiving filter for machine learning training",
            "DEFAI agent created by user is only monitoring new token pairs",
            "DEFAI agent created by user is now monitoring brand-new tokens only",
            "DEFAI agent created by user is now monitoring brand-new tokens + called tokens only",
            "DEFAI agent created by user is now monitoring only new $SOL tokens",
            "DEFAI agent created by user is now monitoring only new $TON tokens",
            "User's DEFAI agent is active on the $SOL network",
            "User's DEFAI agent now ignores this network: $ETH",
            "User named a DEFAI agent: XYZ",
            "A new DEFAI agent was created by user X",
            "DEFAI agent created by user is active in $SOL network",
            "DEFAI agent created by user is active in $ETH network",
            "DEFAI agent created by user is active in $BASE network",
            "DEFAI agent created by user is active in $TRON network",
            "DEFAI agent created by user is active in $TON network",
            "Creating a new bundle of Telegram channels to monitor",
            "Creating a new bundle of Telegram channels to monitor (finding $TICKER + CA)",
            "A new channel has been found and added to the waiting list"
        ];

        return `${getRandomElement(actions)} ${getRandomElement(subjects)} ${getRandomElement(results)}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function getRandomElement(arr: any[]) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    setInterval(() => {
        const timestamp = formatTimestamp();
        const logType = getRandomElement(logTypes);
        const logMessage = generateRandomLogMessage();
        customLog(`[${timestamp}] [${logType}] ${logMessage}`);
    }, 2000);
}

function extractInfo(text: string): string {
    if (/🟡 API_WARNING:/.test(text)) {
        return "API Generated Warning, remove this...";
    }

    const callerMatch = text.match(/(?<=💬 )(\w+)/);
    if (callerMatch) {
        return `Caller: ${callerMatch[1]}`;
    }

    const agentMatch = text.match(/(?<=🚦 )(\w+-?\w*)/);
    if (agentMatch) {
        return `Agent: ${agentMatch[1]}`;
    }

    const filtersWarningMatch = text.match(/FILTERS_WARNING: (.+)/);
    if (filtersWarningMatch) {
        return `Filters Warning: ${filtersWarningMatch[1]}`;
    }

    const dbErrorMatch = text.match(/DB_ERROR: (.+)/);
    if (dbErrorMatch) {
        return `Database Error: ${dbErrorMatch[1]}`;
    }

    const routineWarningMatch = text.match(/ROUTINE_WARNING: (.+)/);
    if (routineWarningMatch) {
        return `Routine Warning: ${routineWarningMatch[1]}`;
    }

    const crawlInfoMatch = text.match(/CRAWL_INFO: (.+)/);
    if (crawlInfoMatch) {
        return `Crawl Info: ${crawlInfoMatch[1]}`;
    }

    const scanInfoMatch = text.match(/SCAN_INFO: (.+)/);
    if (scanInfoMatch) {
        return `Scan Info: ${scanInfoMatch[1]}`;
    }

    const dbTestMatch = text.match(/DB_TEST: (.+)/);
    if (dbTestMatch) {
        return `Database Test ${dbTestMatch[1]}`;
    }

    return "No relevant information found.";
}

function formatTimestamp() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

async function start() {
    console.log("Iniciando sessão do usuário...");

    await client.start({
        phoneNumber: async () => await input.text("Digite seu número de telefone: "),
        password: async () => await input.text("Digite sua senha 2FA (se houver): "),
        phoneCode: async () => await input.text("Digite o código enviado pelo Telegram: "),
        onError: (err) => console.log(err),
    });

    console.log("Usuário autenticado!");
    console.log("Salvando sessão...");
    console.log("Sessão:", client.session.save());

    // TESTE: Verificar se o bot consegue listar o grupo monitorado
    console.log("🔍 Buscando informações do grupo...");
    const dialogs = await client.getDialogs();
    const group = dialogs.find((d) => d.id && d.id.toString() === monitoredGroupId.toString());

    if (!group) {
        console.log(`❌ ERRO: O usuário não está no grupo ${monitoredGroupId}!`);
        return;
    } else {
        console.log(`✅ O usuário está no grupo "${group.title}" (${monitoredGroupId})`);
    }

    // Captura mensagens dentro dos subchats (tópicos)
    client.addEventHandler(async (update) => {
        if (update instanceof Api.UpdateNewMessage || update instanceof Api.UpdateNewChannelMessage) {
            const message = update.message as Api.Message;
            const timestamp = formatTimestamp();

            if (message.peerId instanceof Api.PeerChannel && message.peerId.channelId.toString() === monitoredBotId.toString()) {
                //const sender = message.senderId ? `User ${message.senderId}` : "Unknown";
                const text = message.message || "[Midia/Sticker]";

                //console.log("🔍 Mensagem Recebida:", message);
                const extractedInfo = extractInfo(text);
                customLog(`[${timestamp}] [IA] ${extractedInfo}`);
            }

            if (message.peerId instanceof Api.PeerChannel && "-100" + message.peerId.channelId.toString() === monitoredGroupId.toString()) {
                const threadId = message.replyTo?.replyToMsgId || 0;
                //const fullThreadId = `${monitoredGroupId}_${threadId}`;

                // Captura mensagens que têm um `message_thread_id`
                if (threadId && monitoredThreads.includes(threadId)) {
                    //const sender = message.senderId ? `User ${message.senderId}` : "Unknown";
                    const text = message.message || "[Midia/Sticker]";

                    const extractedInfo = extractInfo(text);

                    //console.log("🔍 Mensagem Recebida:", message);


                    customLog(`[${timestamp}] [IA] ${extractedInfo}`);
                }
            }
        }
    });

    console.log(`✅ Agora monitorando mensagens nos subchats: ${monitoredThreads.join(", ")} do grupo ${monitoredGroupId}.`);
}

start();
generateFakeLogs();