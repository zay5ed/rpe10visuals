import path from 'path'

/** @type {import('next').NextConfig} */
const config = {
  turbopack: {
    root: path.resolve(process.cwd()),
  },
}

export default config

