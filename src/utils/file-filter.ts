export const fileFilter = (req: any, file: any, callback: any) => {
    // Verifica se o tipo do arquivo é uma imagem
    if (file.mimetype.startsWith('image/')) {
        // Aceita o arquivo
        callback(null, true);
    } else {
        // Rejeita o arquivo e gera um erro
        callback(new Error('Apenas imagens são permitidas!'));
    }
}