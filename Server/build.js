const execFileSync = require('child_process').execFileSync
const fs = require('fs')
const replace = require('replace-in-file')
const environment = process.argv[2]

console.log(`\nBuilding with ${environment} settings.`)

const package = JSON.parse(fs.readFileSync('package.json'))
const versionMajor = package.version.split('.')[0]
const versionMinor = package.version.split('.')[1]
const versionPatch = parseInt(package.version.split('.')[2]) + 1
const newVersion = [versionMajor, versionMinor, versionPatch].join('.')
package.version = newVersion

execFileSync('rm', ['-rf', 'preprocessed/'])
execFileSync('cp', ['-R', 'src/', 'preprocessed/'])

try {
  const changes = replace.sync({
    files: 'preprocessed/**/*.js',
    from: [/__BUILD_ENV__/g, /__VERSION__/g],
    to: [environment, newVersion],
  })
  // console.log('Modified files:', changes.join(', '))

  // Write package.json back to file with updated version
  fs.writeFileSync('package.json', JSON.stringify(package, null, 2))
  console.log('Successfully built: ' + newVersion)
} catch (error) {
  console.error('Error occurred:', error)
}
console.log()

execFileSync('rm', ['-rf', 'preprocessed/'])

// {
//   "version": "0.0.1",
//   "scripts": {
//     "start": "yarn run build && RUN_ENV=development node ./lib/main.js",
//     "start--production": "RUN_ENV=production node ./lib/main.js",
//     "build": "node build.js development",
//     "build--production": "node build.js production"
//   },
//   "devDependencies": {
//     "babel-cli": "^6.26.0",
//     "babel-core": "^6.26.3",
//     "babel-plugin-inline-replace-variables": "^1.3.1",
//     "babel-preset-env": "^1.7.0",
//     "chokidar": "^2.0.4",
//     "chokidar-cli": "^1.2.1",
//     "concurrently": "^4.0.1",
//     "replace-in-file": "^3.4.2"
//   },
//   "dependencies": {
//     "blessed": "^0.1.81",
//     "jsondiffpatch": "^0.3.11",
//     "ws": "^6.0.0"
//   }
// }
