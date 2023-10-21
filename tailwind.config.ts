import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'media',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx,vue}',
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        portrait: {
          raw: '(orientation: portrait)',
        },
        landscape: {
          raw: '(orientation: landscape)',
        },
      },
      colors: {
        eggplant: {
          DEFAULT: '#584B5A',
          100: '#110f12',
          200: '#231e24',
          300: '#342d35',
          400: '#463b47',
          500: '#584b5a',
          600: '#7c6a7f',
          700: '#9e8ea0',
          800: '#beb3c0',
          900: '#dfd9df',
        },
        azure: {
          DEFAULT: '#0178DD',
          100: '#00182d',
          200: '#003059',
          300: '#014886',
          400: '#0160b3',
          500: '#0178dd',
          600: '#1c94fe',
          700: '#54affe',
          800: '#8dcafe',
          900: '#c6e4ff',
        },
        cyan: {
          DEFAULT: '#02B3EE',
          100: '#00242f',
          200: '#01475f',
          300: '#016b8e',
          400: '#028fbe',
          500: '#02b3ee',
          600: '#29c8fd',
          700: '#5ed6fd',
          800: '#94e3fe',
          900: '#c9f1fe',
        },
        orange: {
          DEFAULT: '#FA7F3E',
          100: '#3d1602',
          200: '#792c03',
          300: '#b64305',
          400: '#f35906',
          500: '#fa7f3e',
          600: '#fb9964',
          700: '#fcb28b',
          800: '#fdccb1',
          900: '#fee5d8',
        },
        brown: {
          DEFAULT: '#FEB274',
          100: '#4a2200',
          200: '#944301',
          300: '#de6501',
          400: '#fe8a2c',
          500: '#feb274',
          600: '#fec291',
          700: '#ffd2ad',
          800: '#ffe1c8',
          900: '#fff0e4',
        },
      },
    },
  },
  plugins: [require('tailwindcss-safe-area'), require('flowbite/plugin')],
};

export default config;
// export default konstaConfig(config);

// colors extracted from logo using coolors.co:

// - Tailwind

// { 'eggplant': { DEFAULT: '#584B5A', 100: '#110f12', 200: '#231e24', 300: '#342d35', 400: '#463b47', 500: '#584b5a', 600: '#7c6a7f', 700: '#9e8ea0', 800: '#beb3c0', 900: '#dfd9df' }, 'azure': { DEFAULT: '#0178DD', 100: '#00182d', 200: '#003059', 300: '#014886', 400: '#0160b3', 500: '#0178dd', 600: '#1c94fe', 700: '#54affe', 800: '#8dcafe', 900: '#c6e4ff' }, 'process_cyan': { DEFAULT: '#02B3EE', 100: '#00242f', 200: '#01475f', 300: '#016b8e', 400: '#028fbe', 500: '#02b3ee', 600: '#29c8fd', 700: '#5ed6fd', 800: '#94e3fe', 900: '#c9f1fe' }, 'orange_(crayola)': { DEFAULT: '#FA7F3E', 100: '#3d1602', 200: '#792c03', 300: '#b64305', 400: '#f35906', 500: '#fa7f3e', 600: '#fb9964', 700: '#fcb28b', 800: '#fdccb1', 900: '#fee5d8' }, 'sandy_brown': { DEFAULT: '#FEB274', 100: '#4a2200', 200: '#944301', 300: '#de6501', 400: '#fe8a2c', 500: '#feb274', 600: '#fec291', 700: '#ffd2ad', 800: '#ffe1c8', 900: '#fff0e4' } }

// - CSV

// 584B5A,0178DD,02B3EE,FA7F3E,FEB274

// - With #

// #584B5A, #0178DD, #02B3EE, #FA7F3E, #FEB274

// - Array

// ["584B5A","0178DD","02B3EE","FA7F3E","FEB274"]

// - Object

// {"Eggplant":"584B5A","Azure":"0178DD","Process Cyan":"02B3EE","Orange (Crayola)":"FA7F3E","Sandy brown":"FEB274"}

// - Extended Array

// [{"name":"Eggplant","hex":"584B5A","rgb":[88,75,90],"cmyk":[2,17,0,65],"hsb":[292,17,35],"hsl":[292,9,32],"lab":[34,9,-7]},{"name":"Azure","hex":"0178DD","rgb":[1,120,221],"cmyk":[100,46,0,13],"hsb":[208,100,87],"hsl":[208,99,44],"lab":[50,11,-59]},{"name":"Process Cyan","hex":"02B3EE","rgb":[2,179,238],"cmyk":[99,25,0,7],"hsb":[195,99,93],"hsl":[195,98,47],"lab":[68,-17,-40]},{"name":"Orange (Crayola)","hex":"FA7F3E","rgb":[250,127,62],"cmyk":[0,49,75,2],"hsb":[21,75,98],"hsl":[21,95,61],"lab":[66,43,55]},{"name":"Sandy brown","hex":"FEB274","rgb":[254,178,116],"cmyk":[0,30,54,0],"hsb":[27,54,100],"hsl":[27,99,73],"lab":[79,21,43]}]

// - XML

// <palette>
//   <color name="Eggplant" hex="584B5A" r="88" g="75" b="90" />
//   <color name="Azure" hex="0178DD" r="1" g="120" b="221" />
//   <color name="Process Cyan" hex="02B3EE" r="2" g="179" b="238" />
//   <color name="Orange (Crayola)" hex="FA7F3E" r="250" g="127" b="62" />
//   <color name="Sandy brown" hex="FEB274" r="254" g="178" b="116" />
// </palette>
