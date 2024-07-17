/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BCKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
