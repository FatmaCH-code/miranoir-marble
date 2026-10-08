# Miranoir Marble — website

React + Vite + Tailwind. Same stack as odara-fashion.

## Run it
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
```
Works immediately in **demo mode** (data saved in your browser).
Admin: `/admin` → `admin@miranoir.com` / `miranoir123`

## Edit first
- `src/config.js` — phones, WhatsApp, email, address, map, social links, brands
- `src/i18n.js` — all Turkish / English text
- `src/data/projects.js` + `public/projects/` — finished-project photos
- `src/data/posts.js` — blog articles
- `public/stones/` — stone photos (placeholders, replace with real slab photos or upload in admin)

## Connect a real database (Supabase)
1. Create a Supabase project → copy URL + anon key into `.env.local` (see `.env.example`).
2. SQL Editor → run `sql/schema.sql`, then `sql/seed_stones.sql`.
3. Storage → new **public** bucket named `stone-images`.
4. Authentication → Users → add your user, then in SQL Editor:
   ```sql
   insert into profiles (id, email, is_admin)
   select id, email, true from auth.users where email = 'you@example.com'
   on conflict (id) do update set is_admin = true;
   ```
5. Restart `npm run dev`, sign in at `/admin/login`.

## Deploy
Push to GitHub and import on Vercel (`vercel.json` already handles page routes).
Add the two `VITE_SUPABASE_*` variables in Vercel settings.
