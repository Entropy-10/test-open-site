const config = {
  plugins: {
    "@stylexswc/postcss-plugin": {
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      useCSSLayers: true,
      rsOptions: {
        dev: process.env.NODE_ENV === "development",
        runtimeInjection: false,
        treeshakeCompensation: true,
        unstable_moduleResolution: { type: "commonJS", rootDir: process.cwd() }
      }
    },
    "@tailwindcss/postcss": {}
  }
}

export default config
