# AutomationProjectShell

A small project to collect automation shell utilities and scripts.

## Description

Initial repository for AutomationProjectShell.

## Usage

Add scripts and documentation here.

## Deployment (Vercel)

This monorepo can be deployed to Vercel. Recommended project settings for the web app:

- **Project root:** `apps/web`
- **Install command:** `pnpm install`
- **Build command:** `pnpm --filter @automation/web build`
- **Output directory:** `apps/web/dist`

I added a `vercel.json` that builds `apps/web` using `@vercel/static-build`. After you create the Vercel project, set the GitHub integration and point the project root to `apps/web` (Vercel will detect framework as Vite or you can set it manually).



**Deploy trigger:** 2026-01-12T15:27:22Z
