# Family Tree MVP

## 🚀 One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/appdevspring16-projects/Family-tree-app)

## ⚙️ Setup

Create a project in Supabase.

### SQL:
create table people (
  id uuid primary key default uuid_generate_v4(),
  first_name text,
  last_name text,
  photo_url text,
  created_at timestamp default now()
);

### Env vars:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

### Storage:
Create bucket: photos (make public)

## ✨ Features
- Auth
- Add people
- Upload photos
- Shared database
