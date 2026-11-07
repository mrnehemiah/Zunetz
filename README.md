# ZUNE PREMIUM ADMIN 3.0

This build removes sample data and connects the UI to the supplied Supabase project using its publishable key. All module pages live in the project root; JavaScript is in `js/`; styles are in `css/`; SQL bootstrap is in `database/`.

## Setup
- Serve this folder from a web server (do not open with `file://`).
- Review and run `database/schema.sql` in Supabase SQL Editor.
- Assign the administrator's Supabase Auth `app_metadata.role` to `admin` or `super_admin` using a trusted server-side process.
- Ensure existing marketplace tables/columns match the module metadata.

## Important production note
The admin UI performs live table reads and generic create/update/delete operations where RLS permits. It does not fabricate fallback records. Financial workflows, notification dispatch, role provisioning, identity verification, and payout execution must be completed with dedicated server-side RPC/Edge Functions and provider integrations before real-money production use. Never place the Supabase service-role key in browser code.
