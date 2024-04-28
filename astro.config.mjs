import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sentry, { metrics } from '@sentry/astro';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      nesting: true,
    }),
    sentry({
      dsn: 'https://abcbad313eb9874026eaeca0c4699a34@o4507165268901888.ingest.us.sentry.io/4507165270278144',
      sourceMapsUploadOptions: {
        project: 'javascript-astro',
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
      integrations: [metrics.metricsAggregatorIntegration()],
    }),
  ],
});
