const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: ['./src/**/*.{html,js,jsx,ts}','./index.html',"./node_modules/flowbite/**/*.js",flowbite.content(),],
  theme: {
    extend: {},
  },
  plugins: [daisyui,require('flowbite/plugin'),flowbite.plugin(),],
}

