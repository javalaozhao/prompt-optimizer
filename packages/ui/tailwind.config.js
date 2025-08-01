// Inherits the root configuration
const sharedConfig = require('../../../tailwind.config.ts');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Load the preset
  presets: [sharedConfig],

  // Add package-specific content paths
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
};