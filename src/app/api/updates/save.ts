import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

/**
 * Salva a imagem localmente e retorna um link para acesso.
 * @param imageBuffer Buffer contendo os dados da imagem.
 * @returns Um Promise com o link local da imagem (ex: http://localhost:3000/uploads/arquivo.jpg).
 */
export async function saveImageLocally(imageBuffer: Buffer): Promise<string> {
  // Usa process.cwd() para pegar a raiz do projeto
  const uploadsDir = path.join(process.cwd(), "public", "uploads");

  // Garante que a pasta exista (cria se necessário)
  await fs.mkdir(uploadsDir, { recursive: true });

  // Calcula o hash da imagem para gerar um nome único
  const hash = crypto.createHash("sha256").update(imageBuffer).digest("hex");
  const fileName = hash + ".jpg";
  const filePath = path.join(uploadsDir, fileName);

  // Verifica se o arquivo já existe
  try {
    await fs.access(filePath);
    // Se existir, apenas retornamos o nome
    return fileName;
  } catch {
    // Se não existir, salva a imagem e retorna o nome
    await fs.writeFile(filePath, imageBuffer);
    return fileName;
  }
}
//
