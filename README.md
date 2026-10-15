# Miranoir Mermer — website

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
- `src/config.js` — phone, WhatsApp, email, address, map, social links, brands, application areas + their pictures
- `src/i18n.js` — all Turkish / English text
- `src/data/posts.js` — blog articles
- `src/data/seedStones.js` + `public/catalog/` — the 153 catalogue stones
- `src/data/projects.js` + `public/projects2/` — project photos from the catalogue

## Connect the Supabase database (project dnvsomnckiemvnqsbbdh)
The project URL is already set in `.env.local`. You only need to add the key and create the tables.

1. **Key** — Supabase → Project Settings → API Keys → copy the *Publishable key*
   (`sb_publishable_...`) or the legacy *anon public* key, and paste it after
   `VITE_SUPABASE_ANON_KEY=` in `.env.local`.
2. **Tables** — Supabase → SQL Editor → New query → paste `sql/schema.sql` → Run.
3. **Catalogue** — new query → paste `sql/seed_stones.sql` → Run.
   The last line prints the 8 collections and how many stones each has (153 total).
4. **Photo uploads** — Storage → New bucket → name `stone-images`, tick *Public*.
5. **Your admin account** — Authentication → Users → Add user (email + password), then in SQL Editor:
   ```sql
   insert into profiles (id, email, is_admin)
   select id, email, true from auth.users where email = 'you@example.com'
   on conflict (id) do update set is_admin = true;
   ```
6. Restart `npm run dev`. The admin login at `/admin/login` now uses that account,
   and quote requests from the site are saved in the `quotes` table.

The catalogue photos live in `public/catalog` and are published with the site,
so they don't use Supabase storage. Photos you upload later from the admin
go to the `stone-images` bucket.

## Deploy
Push to GitHub and import on Vercel (`vercel.json` already handles page routes).
Add the two `VITE_SUPABASE_*` variables (same values as `.env.local`) in Vercel → Settings → Environment Variables.
