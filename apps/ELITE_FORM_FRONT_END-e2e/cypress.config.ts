import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run ELITE_FORM_FRONT_END:serve:development',
        production: 'nx run ELITE_FORM_FRONT_END:serve:production',
      },
      ciWebServerCommand: 'nx run ELITE_FORM_FRONT_END:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
