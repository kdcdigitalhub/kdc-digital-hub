[README.md](https://github.com/user-attachments/files/34288123/README.md)
# KDC DIGITAL HUB — Etapa 1

Website inicial responsivo da KDC DIGITAL HUB, construído com HTML5, CSS3 e JavaScript puro.

## Conteúdo
- `index.html` — estrutura da página e secções.
- `styles.css` — identidade visual, layout responsivo e componentes.
- `script.js` — categorias, catálogo de demonstração, pesquisa, filtros, ordenação, favoritos e detalhes dos livros.

## Como executar
1. Descompacte a pasta `kdc-digital-hub`.
2. Abra `index.html` num navegador atualizado.
3. Para desenvolvimento, recomenda-se usar a extensão **Live Server** no Visual Studio Code e abrir a pasta do projeto.

Não é necessário instalar Node.js ou qualquer pacote para esta primeira versão.

## Como personalizar os livros
Abra `script.js` e procure o array `books`. Cada objeto representa um livro. Edite:
- `title`: título;
- `author`: autor;
- `category`: categoria;
- `description`: descrição;
- `price`: preço em Kz (use `0` para gratuito);
- `date`: data no formato `AAAA-MM-DD`;
- `pages`: número de páginas;
- `format`: formato;
- `colors`: duas cores da capa ilustrativa;
- `keywords`: termos adicionais para pesquisa.

As capas atuais são ilustrações CSS geradas pelo próprio site, não capas reais de publicações.

## O que funciona nesta etapa
- Navegação por secções;
- Menu móvel;
- Pesquisa por título, autor, categoria e palavras-chave;
- Filtro por categoria;
- Ordenação;
- Cartões de livros e janela de detalhes;
- Favoritos guardados no navegador através de `localStorage`.

## O que ainda NÃO está ativo
Esta é uma primeira versão front-end. Não existe ainda:
- contas reais ou autenticação;
- base de dados partilhada;
- painel Super Admin/CMS persistente;
- upload de ficheiros;
- compra ou processamento de pagamentos;
- downloads de eBooks;
- proteção de ficheiros pagos.

Os botões de compra/acesso são demonstrações e informam que a integração ainda está pendente. Não introduza livros pagos reais nesta versão sem backend e controlo de acesso.

## Publicação gratuita
### Opção A — GitHub Pages
1. Crie uma conta em https://github.com.
2. Crie um repositório público, por exemplo `kdc-digital-hub`.
3. Carregue `index.html`, `styles.css` e `script.js` (pode também carregar a pasta `assets`).
4. Abra **Settings → Pages**.
5. Em **Build and deployment**, escolha **Deploy from a branch**.
6. Selecione `main` e `/ (root)` e guarde.
7. Aguarde a publicação; o GitHub apresentará o endereço do site.

### Opção B — Netlify
1. Crie uma conta em https://www.netlify.com.
2. No painel, escolha adicionar um novo site por deploy manual.
3. Arraste a pasta do projeto para a área de publicação.
4. Aguarde o endereço público gerado.

## Próximas etapas
2. Melhorar o catálogo, adicionar páginas individuais e separar dados dos componentes.
3. Criar painel de gestão local de demonstração.
4. Integrar Supabase para autenticação, base de dados, armazenamento privado e regras de segurança.
5. Integrar gateway de pagamentos compatível com Angola e testar compras antes do lançamento.
