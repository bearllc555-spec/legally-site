# Legally — deployment

**GitHub:** https://github.com/bearllc555-spec/legally-site

**Design source:** Editorial serif law firm template (998webdesigns `01-haldwell-law`), rebranded as Legally.

## Cloudflare Pages

| Environment | Git branch | Preview URL |
|-------------|------------|-------------|
| **Dev (sandbox)** | `dev` | https://dev.legally-design.pages.dev |
| **Production** | `main` | https://legally-design.pages.dev |

- **Pages project:** `legally-design`
- **URL mode:** `root` (single-page app at `/`)
- **Build output:** `./dist` (Vite production build)
- **Account ID:** `e0f6f68f26f8a26a75eaa793385019ef`

Workflow: `.github/workflows/deploy.yml` — builds on push to `main` and `dev`, sets `VITE_SITE_URL` per branch in the workflow file (not empty repo variables), deploys with Wrangler.

### Version label

Bump `SITE_VERSION` in `src/lib/version.ts` on **every** change (`v1.01` → `v1.02`, …). It appears in the site header next to the brand name.

### Header home link

Clicking the brand title runs `goHome()` — scrolls to top and removes any `#hash` from the URL.

### Branch workflow

1. Day-to-day work on **`dev`** — pushes auto-deploy to the dev preview URL.
2. Merge to **`main`** when ready for production preview / custom domain.

### GitHub Actions secrets

Configured on the repo (do not commit tokens):

| Secret | Purpose |
|--------|---------|
| `CLOUDFLARE_API_TOKEN` | API token with Cloudflare Pages edit permission |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID |

### Manual deploy (local)

```powershell
cd c:\Users\thede\OneDrive\Documents\001-cloudflare\005-legally-design
npm run build
$env:CLOUDFLARE_ACCOUNT_ID = "<your-account-id>"
# Set CLOUDFLARE_API_TOKEN in the environment
npx wrangler pages deploy ./dist --project-name=legally-design --branch=dev
```

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173
