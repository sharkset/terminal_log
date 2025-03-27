import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { Api } from "telegram/tl";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import input from "input";
import { parseDefaiCreatorMessage, SectionItem, splitMessageByLineAndEntities } from "./parse";
import dotenv from 'dotenv';
dotenv.config();

const apiId = parseInt(process.env.API_ID || "0");
const apiHash = process.env.API_HASH || "";
const monitoredGroupId = parseInt(process.env.GROUP_ID || "0"); // Grupo público com mensagens de bots
const monitoredBotId = parseInt(process.env.BOT_ID || "0"); // ID do bot que envia as mensagens

const sessionString = process.env.SESSION_STRING; // String de sessão do usuário
const saveSession = process.env.USER_SESSION; // String de sessão do usuário
const client = new TelegramClient(new StringSession(saveSession ? saveSession : sessionString), apiId, apiHash, { connectionRetries: 5 });

// Lista de tópicos que queremos monitorar¸/* ¸ */
const monitoredThreads = [
    237, 1017214, 816408, 105460, 1, 910, 816414, 106458, 137696
];

// IDs e configurações
const defaiCreatorChannelId = -1002159053734;
const defaiCreatorMsgIds = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const MAX_LOGS = 1000;
export const logs: string[] = [];
export const msgParsed: Array<Record<string, SectionItem[]>> = [];

async function fetchExistingDefaiCreatorMessages(client: TelegramClient) {
    try {
        // Busca as mensagens existentes no canal com os IDs especificados
        const messages = await client.getMessages(defaiCreatorChannelId, {
            ids: defaiCreatorMsgIds,
        });

        // Pode retornar menos itens se alguma mensagem não existir ou tiver sido deletada.
        for (const msg of messages) {
            if (msg && msg.message) {
                splitMessageByLineAndEntities(
                    msg.message,
                    msg.entities
                );

                /* for (const [idx, lineObj] of linesWithLinks.entries()) {
                    console.log(`Linha #${idx}:`, lineObj.text);
                    console.log(`   Links:`, lineObj.links);
                } */

                const parsed = await parseDefaiCreatorMessage(client, msg.message, msg.entities);
                msgParsed.push(parsed);
                //console.log("Resultado parseado:", msgParsed);
            }
        }
    } catch (err) {
        console.error("Erro ao buscar mensagens existentes:", err);
    }
}

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
        const actions = ["Initializing", "Processing", "Validating", "Executing", "Scanning", "Updating", "Loading", "Checking", "Retrieving", "Connecting", "Eliminating", "Analyzing", "Optimizing", "Monitoring", "Archiving", "Creating", "Deleting", "Modifying", "Recovering", "Rebooting", "Reconfiguring", "Rebuilding", "Releasing", "Deploying", "Testing", "Debugging", "Compiling", "Encrypting", "Decrypting", "Authenticating", "Authorizing", "Verifying", "Validating", "Resolving", "Handling", "Escalating", "Escaping", "Blocking", "Unblocking", "Filtering", "Crawling", "Scanning", "Detecting", "Identifying", "Classifying", "Categorizing", "Grouping", "Sorting", "Filtering", "Searching", "Indexing", "Archiving", "Compressing", "Decompressing", "Encrypting", "Decrypting", "Signing", "Verifying", "Validating", "Authenticating", "Authorizing", "Hashing", "Salting", "Peppering", "Encoding", "Decoding", "Parsing", "Serializing", "Deserializing", "Transforming", "Transcoding", "Converting", "Normalizing", "Denormalizing", "Standardizing", "Canonicalizing", "Optimizing", "Minifying", "Obfuscating", "Deobfuscating", "Compiling", "Decompiling", "Interpreting", "Executing", "Running", "Stopping", "Pausing", "Resuming", "Restarting", "Shutting down", "Booting up", "Waking up", "Sleeping", "Hibernating", "Suspending", "Resuming", "Recovering", "Rebooting", "Reconfiguring", "Rebuilding", "Releasing", "Deploying", "Testing", "Debugging", "Compiling", "Encrypting", "Decrypting", "Authenticating", "Authorizing", "Verifying", "Validating", "Resolving", "Handling", "Escalating", "Escaping", "Blocking", "Unblocking", "Filtering", "Crawling", "Scanning", "Detecting", "Identifying", "Classifying", "Categorizing", "Grouping", "Sorting", "Filtering", "Searching", "Indexing", "Archiving", "Compressing", "Decompressing"];
        const subjects = ["database", "network", "user session", "API request", "security module", "disk storage", "configuration", "authentication", "logs", "server instance"];
        const results = ["completed successfully.", "encountered an issue!", "is taking longer than expected.", "requires manual intervention.", "was interrupted.", "is now online.", "failed to respond.", "is running optimally.", "detected an anomaly.", "needs a restart.",
             "brand new tokens on $SOL",
             "brand new tokens on $ETH",
             "brand new tokens on $BASE",
             "brand new tokens on $TON",
             "brand new tokens on $TON",
             "patterns for low-performance tokens",
             "patterns for low-performance tokens (2x-)",
             "patterns for medium-performance tokens (2x+)",
             "patterns for high-performance tokens (10x+)",
             "machine learning filters for Seekai Research",
             "machine learning filters for Seekai Gamble",
             "user clicked on the @defaicreator bot",
             "DEFAI agent created by a user, monitoring filters patterns and performance",
             "filter created by a user reached medium-performance token metrics, archiving filter for machine learning training",
             "DEFAI agent created by user is only monitoring new token pairs",
             "DEFAI agent created by user is now monitoring brand-new tokens only",
             "DEFAI agent created by user is now monitoring brand-new tokens + called tokens only",
             "DEFAI agent created by user is active in $SOL network",
             "DEFAI agent created by user is active in $ETH network",
             "DEFAI agent created by user is active in $BASE network",
             "DEFAI agent created by user is active in $TRON network",
             "DEFAI agent created by user is active in $TON network",
             "DEFAI agent created by user now ignores $SOL network",
             "DEFAI agent created by user now ignores $TON network",
             "DEFAI agent created by user now ignores $ETH network",
             "DEFAI agent created by user now ignores $BASE network",
             "a new bundle of Telegram channels to monitor",
             "a new bundle of Telegram channels to monitor (finding $TICKER + CA)"
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

    const signalRegex = /(?:SOL|BSC|ETH|TON|TRON|SUI) Signal\s*💬\s*(.*?)\s*\n.*\n([a-zA-Z0-9]+)\s*\n📊 Chart/;
    const callAlertRegex = /(.*just passed \d+x!)/;

    let match = text.match(signalRegex);
    if (match) {
        return `Signal: ${match[1]}, Token: ${match[2]}`;
    }

    match = text.match(callAlertRegex);
    if (match) {
        return match[1]; // Retorna apenas a primeira linha com "just passed"
    }

    const callerMatch = text.match(/(?<=💬 )(\w+)/);
    if (callerMatch) {
        return `Generating call of: ${callerMatch[1]}`;
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
                customLog(`[${timestamp}] [IA] 🤖 ${extractedInfo}`);
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

                    customLog(`[${timestamp}] [IA] 🤖 ${extractedInfo}`);
                }
            }
        }
    });

    console.log(`✅ Agora monitorando mensagens nos subchats: ${monitoredThreads.join(", ")} do grupo ${monitoredGroupId}.`);
    await fetchExistingDefaiCreatorMessages(client);

    await monitorDefaiCreatorChannel(client);

    console.log("✅ Monitorando canal DefaiCreator e subchats do grupo ao mesmo tempo!");

    //console.log("Logs gerados:", JSON.stringify(msgParsed));

}

// Função que inicia o “escuta” de mensagens no canal -1002159053734
async function monitorDefaiCreatorChannel(client: TelegramClient) {
    client.addEventHandler(async (update) => {
        // Mensagem nova no canal
        if (update instanceof Api.UpdateNewChannelMessage) {
            const message = update.message as Api.Message;
            if (isDefaiCreatorTargetMessage(message)) {
                const parsedResult = await parseDefaiCreatorMessage(
                    client,
                    message.message || "",
                    message.entities
                );
                msgParsed.push(parsedResult);
               /*  console.log(
                    "Mensagem NOVA do canal DefaiCreator parseada:",
                    parsedResult
                ); */
            }
        }
        // Mensagem editada no canal
        else if (update instanceof Api.UpdateEditChannelMessage) {
            const message = update.message as Api.Message;
            if (isDefaiCreatorTargetMessage(message)) {
                const parsedResult = await parseDefaiCreatorMessage(
                    client,
                    message.message || "",
                    message.entities
                );
                msgParsed.push(parsedResult);
                /* console.log(
                    "Mensagem EDITADA do canal DefaiCreator parseada:",
                    parsedResult
                ); */
            }
        }
    });
}

// Verifica se a mensagem vem do canal correto e se o message_id está na lista
function isDefaiCreatorTargetMessage(message: Api.Message) {
    if (!(message.peerId instanceof Api.PeerChannel)) return false;

    // -100 + channelId = ID completo do canal no Telegram
    const fullChannelId = "-100" + message.peerId.channelId.toString();
    if (fullChannelId !== defaiCreatorChannelId.toString()) return false;

    // Verifica se o message_id está na lista que queremos
    if (!defaiCreatorMsgIds.includes(message.id)) return false;

    return true;
}

start();
generateFakeLogs();
//