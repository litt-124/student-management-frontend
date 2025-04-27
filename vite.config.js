import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
        scss: {
            additionalData: `
      @import "@/styles/global.scss";
      @import "@/styles/variables.scss";
      @import "@/styles/fonts.scss";
      @import "@/styles/typography.scss";
            @import "@/styles/buttons.scss";
      @import "@/styles/table.scss";
      @import "@/styles/forms.scss";
    `,
        },
    },
},
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src') 
  }
}
})
