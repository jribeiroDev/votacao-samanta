# 🚀 Deploy no Netlify - Vote Samanta

## Passos para Deploy

### 1. Preparar o Projeto

Certifique-se de que todas as alterações estão commitadas:

```bash
git add .
git commit -m "Preparar para deploy"
git push
```

### 2. Deploy via Netlify (Opção 1 - Recomendado)

#### A. Via Git (GitHub/GitLab/Bitbucket)

1. Acesse [netlify.com](https://www.netlify.com)
2. Faça login ou crie uma conta
3. Clique em "Add new site" > "Import an existing project"
4. Conecte sua conta GitHub/GitLab/Bitbucket
5. Selecione o repositório `Vote-Samanta`
6. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
7. Clique em "Deploy site"

#### B. Via Netlify CLI

```bash
# Instalar Netlify CLI globalmente
npm install -g netlify-cli

# Fazer login
netlify login

# Fazer deploy
netlify deploy --prod
```

### 3. Deploy Manual (Opção 2)

```bash
# 1. Fazer build de produção
npm run build

# 2. Arrastar a pasta `build` para netlify.com/drop
```

### 4. Configurar Domínio Personalizado (Opcional)

1. No painel do Netlify, vá em "Domain settings"
2. Clique em "Add custom domain"
3. Siga as instruções para configurar DNS

### 5. Variáveis de Ambiente (Se necessário)

Se você tiver variáveis de ambiente sensíveis:

1. No painel Netlify, vá em "Site settings" > "Environment variables"
2. Adicione as variáveis necessárias
3. Faça redeploy do site

## ✅ Verificações Pré-Deploy

- [ ] Código testado localmente (`npm start`)
- [ ] Build funciona sem erros (`npm run build`)
- [ ] URL do Google Apps Script configurada corretamente
- [ ] Todas as dependências instaladas (`npm install`)
- [ ] Arquivos `.gitignore` configurados corretamente

## 📝 Arquivos de Configuração Criados

- `netlify.toml` - Configuração principal do Netlify
- `public/_redirects` - Redirecionamentos para SPA
- `.env.production` - Variáveis de ambiente de produção

## 🔧 Comandos Úteis

```bash
# Build local
npm run build

# Testar build localmente
npx serve -s build

# Ver preview do deploy
netlify deploy

# Deploy em produção
netlify deploy --prod
```

## 🌐 Após o Deploy

Seu site estará disponível em:
- URL Netlify: `https://nome-aleatorio.netlify.app`
- Você pode mudar para: `https://vote-samanta.netlify.app` (se disponível)
- Ou configurar domínio personalizado

## 🐛 Troubleshooting

**Erro de build:**
- Verifique se `package.json` está correto
- Execute `npm install` localmente
- Verifique logs no painel Netlify

**Página em branco:**
- Verifique se `_redirects` está em `public/`
- Confirme que `homepage` não está configurado incorretamente

**CORS errors:**
- Verifique configuração do Google Apps Script
- Confirme que o script está publicado corretamente
