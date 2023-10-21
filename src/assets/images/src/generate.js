import { $ } from 'zx';

// I would like to reference from the assets folder, but haven't figured out how yet
await $`pnpm pwa-asset-generator ./src/assets/images/src/icon.png ./src/assets/images/out --background="#ffb375" --favicon`;
