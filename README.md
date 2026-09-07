> [!NOTE]
> This is the v2 rewrite of the TEST Open website. It aims to move the site onto more modern tooling and frameworks. Where possible, the code will not be modified (mainly styling and overall html structure) to maintain visual consistency with v1. I will also be taking this opportunity to remove any no longer used code (ex: auth, registration, team invites, team management, etc...).

# TEST Open Website

[![Better Stack Badge](https://uptime.betterstack.com/status-badges/v1/monitor/u726.svg)](https://status.test-open.com/)

A small website for our osu tournament for TEST Open 2024.

## Tech Stack

- [Bun](https://bun.com): Package Manager and Runtime
- [Typescript](https://www.typescriptlang.org): Language
- [Next.js](https://nextjs.org): Framework
- [Vercel](https://vercel.com/home): Hosting
- [Tailwind CSS](https://tailwindcss.com): CSS Styling
- [Base UI](https://base-ui.com): Accessible Components
- [PlanetScale](https://planetscale.com): Database
- [Next Intl](https://next-intl.dev): Localization
- [Evlog](https://evlog.dev): Logging
- [BetterStack](https://betterstack.dev): Status and Log Ingest

## Getting Started

Follow these steps to get the dev server up and running:

1. **Set Environment Variables**: Ensure you've set all environment variables.

2. **Install Dependencies**: Use Nub to install project dependencies:

   ```shell
   bun install
   ```

3. **Start the Server**: Run the following command to start the dev server:

   ```shell
   bun dev
   ```
