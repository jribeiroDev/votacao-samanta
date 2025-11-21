# Sistema de Votação - Vote Samanta

Aplicativo React para votação com múltiplas opções e integração com Google Sheets.

## Configuração

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Google Sheets

Para enviar os dados para o Google Sheets, você precisa:

1. Criar uma planilha no Google Sheets
2. Ir em Extensões > Apps Script
3. Criar um novo projeto e colar o seguinte código:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Adicionar cabeçalhos se a planilha estiver vazia
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Data/Hora",
        "Nome",
        "Opção Escolhida",
        "Outro (Texto)",
      ]);
    }

    // Adicionar os dados
    sheet.appendRow([
      new Date(),
      data.name,
      data.selectedOption,
      data.otherText || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Fazer o deploy do script:

   - Clique em "Implantar" > "Nova implantação"
   - Tipo: "Aplicativo da Web"
   - Executar como: "Eu"
   - Quem tem acesso: "Qualquer pessoa"
   - Copiar a URL do aplicativo da web

5. Colar a URL no arquivo `src/App.js` na constante `GOOGLE_SCRIPT_URL`

### 3. Executar o Aplicativo

```bash
npm start
```

O aplicativo abrirá em [http://localhost:3000](http://localhost:3000)

## Recursos

- Formulário de votação com título e descrição
- Múltiplas opções de votação
- Opção "Outro" com campo de texto personalizado
- Envio automático para Google Sheets
- Interface responsiva e moderna
- Feedback visual de envio

## Tecnologias

- React 18
- Axios para requisições HTTP
- Google Apps Script para integração com Sheets
