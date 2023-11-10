// // import fs from 'fs';
// const fs = require('fs')

// // import path from 'path'
// const path = require('path')
// // import url from 'url'
// const url = require('url')

// const __filename = url.fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// // This script modifies the built CSS files and prepends the repo-name to the asset URLs.
// // to be compatible with github pages deployment.
// const cssDir = path.join(__dirname, '/out/_next/static/css')
// // Update your repository name here if it is different from the project name.
// let repoURL = 'o1js-images'
// const files = fs.readdirSync(cssDir)

// files.forEach((file) => {
//   if (path.extname(file) === '.css') {
//     const filePath = path.join(cssDir, file)

//     const data = fs.readFileSync(filePath, 'utf8')

//     const singleQuoteRegex = new RegExp(`url\\(\\s*'\\/(?!${repoURL})`, 'g')
//     const doubleQuoteRegex = new RegExp(`url\\(\\s*"\\/(?!${repoURL})`, 'g')

//     let result = data.replace(singleQuoteRegex, `url('/${repoURL}/`)
//     result = result.replace(doubleQuoteRegex, `url("/${repoURL}/`)

//     fs.writeFileSync(filePath, result, 'utf8')
//   }
// })

import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

// Getting the file and directory path in the context of ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// This script modifies the built CSS files and prepends the repo-name to the asset URLs
// to be compatible with GitHub Pages deployment.
const cssDir = path.join(__dirname, '/out/_next/static/css')

// Update your repository name here if it is different from the project name.
let repoURL = 'o1js-images'
const files = fs.readdirSync(cssDir)

files.forEach((file) => {
  if (path.extname(file) === '.css') {
    const filePath = path.join(cssDir, file)
    const data = fs.readFileSync(filePath, 'utf8')

    const singleQuoteRegex = new RegExp(`url\\(\\s*'\\/(?!${repoURL})`, 'g')
    const doubleQuoteRegex = new RegExp(`url\\(\\s*"\\/(?!${repoURL})`, 'g')

    let result = data.replace(singleQuoteRegex, `url('/${repoURL}/`)
    result = result.replace(doubleQuoteRegex, `url("/${repoURL}/`)

    fs.writeFileSync(filePath, result, 'utf8')
  }
})
