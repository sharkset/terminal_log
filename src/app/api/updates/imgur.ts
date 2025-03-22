import axios from "axios";
import FormData from "form-data";

/**
 * Faz o upload de uma imagem para o Imgur.
 * @param imageBuffer Buffer contendo os dados da imagem.
 * @returns Um Promise com o link público da imagem.
 */
export async function uploadImageToImgur(imageBuffer: Buffer): Promise<string> {
  const clientId = process.env.IMGUR_CLIENT_ID;
  if (!clientId) {
    throw new Error("IMGUR_CLIENT_ID não definido nas variáveis de ambiente.");
  }

  // Cria um form data para enviar a imagem em base64
  const form = new FormData();
  form.append("image", imageBuffer.toString("base64"));
  form.append("type", "base64");

  // Faz a requisição POST para o Imgur
  const response = await axios.post("https://api.imgur.com/3/image", form, {
    headers: {
      ...form.getHeaders(),
      Authorization: `Client-ID ${clientId}`,
    },
  });

  if (response.data && response.data.success) {
    return response.data.data.link;
  }

  throw new Error("Falha ao fazer upload da imagem para o Imgur");
}
