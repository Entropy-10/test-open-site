import styleXPlugin from "@stylexjs/babel-plugin"

const config = {
  presets: ["next/babel"],
  plugins: [
    [
      styleXPlugin,
      {
        runtimeInjection: false,
        dev: process.env.NODE_ENV !== "production",
        treeshakeCompensation: true,
        unstable_moduleResolution: {
          type: "commonJS",
          rootDir: import.meta.dirname
        }
      }
    ]
  ]
}

export default config
