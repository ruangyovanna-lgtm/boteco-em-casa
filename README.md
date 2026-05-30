# Boteco em Casa — Landing Page (Edição Copa 2026)

Landing page estática (HTML + CSS + JS) para o info-produto **Boteco em Casa**.

- **Checkout:** Kiwify (`https://pay.kiwify.com.br/IXT0o9p`)
- **Preço:** R$ 14,90
- **Tráfego:** Facebook Ads
- **Foco:** mobile

## Antes de subir — 2 coisas pra fazer

### 1. Trocar o `{{PIXEL_ID}}` no `index.html`

Find/replace dos dois lugares onde aparece `{{PIXEL_ID}}` pelo ID numérico do seu Pixel do Facebook.

### 2. Colocar as imagens em `/img`

Exportar as páginas dos PDFs do produto (qualidade JPG ~80%, largura ~1080px) e salvar com estes nomes em `img/`:

| Arquivo | Origem |
|---|---|
| `hero-mesa.jpg` | p20 do PDF principal (mesa montada — final) |
| `capa-produto.jpg` | p1 do PDF principal (capa) |
| `cardapio-brasil.jpg` | p6 do PDF principal |
| `cardapio-economico.jpg` | p7 do PDF principal |
| `cardapio-final.jpg` | p8 do PDF principal |
| `receita-smash.jpg` | p10 do PDF principal |
| `receita-batata.jpg` | p9 do PDF principal |
| `receita-onion.jpg` | p11 do PDF principal |
| `receita-frango.jpg` | p12 do PDF principal |
| `checklist.jpg` | p4 do PDF principal |
| `lista-compras.jpg` | p4 do order bump (lista 4 pessoas) |
| `og-image.jpg` | 1200×630, qualquer imagem do produto pra compartilhamento |

Dica: comprima as imagens em [squoosh.app](https://squoosh.app) ou [tinypng.com](https://tinypng.com) antes de subir.

## Como testar localmente

```powershell
cd C:\Users\ruang\boteco-em-casa-site
python -m http.server 8000
```
Abra `http://localhost:8000` no navegador. O Pixel só dispara em http(s), não no `file://`.

Para conferir UTM forwarding:
```
http://localhost:8000?utm_source=facebook&utm_campaign=teste&fbclid=ABC123
```
Clique em qualquer CTA — a URL do Kiwify deve abrir com as UTMs anexadas.

Para conferir o Pixel: instale a extensão **Meta Pixel Helper** no Chrome.

## Deploy no GitHub Pages

1. Crie um repo público (ex: `boteco-em-casa-site`) na sua conta do GitHub.
2. No terminal, na pasta do projeto:
   ```powershell
   git init
   git add .
   git commit -m "site inicial"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/boteco-em-casa-site.git
   git push -u origin main
   ```
3. No GitHub: **Settings → Pages → Source: `main` / `/ (root)` → Save**.
4. Em ~1 min, a URL fica disponível: `https://SEU_USUARIO.github.io/boteco-em-casa-site/`.
5. (Opcional) Domínio próprio: crie o arquivo `CNAME` com seu domínio e configure o DNS.

## Estrutura

```
boteco-em-casa-site/
├── index.html       ← Single page, 11 seções
├── style.css        ← Mobile-first, max-width 480px
├── script.js        ← Countdown + UTM forwarding
├── img/             ← Coloque as imagens aqui
└── README.md
```

## Placeholders

- `{{PIXEL_ID}}` — substituir antes do deploy (2 ocorrências no `index.html`)

URL do Kiwify e preço (`R$ 14,90`) já estão em hard-code, é só editar se mudar.
