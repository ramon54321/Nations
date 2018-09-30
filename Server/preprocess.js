const execFileSync = require('child_process').execFileSync
const fs = require('fs')
const replace = require('replace-in-file')
const environment = process.argv[2]

console.log(`\nBuilding with ${environment} settings.`)

// Read current version and increment
const package = JSON.parse(fs.readFileSync('package.json'))
const versionMajor = package.version.split('.')[0]
const versionMinor = package.version.split('.')[1]
const versionPatch = parseInt(package.version.split('.')[2]) + 1
const newVersion = [versionMajor, versionMinor, versionPatch].join('.')
package.version = newVersion

// Clean up
execFileSync('rm', ['-rf', 'lib/'])
execFileSync('rm', ['-rf', 'preprocessed/'])
execFileSync('cp', ['-R', 'src/', 'preprocessed/'])

try {
  replace.sync({
    files: 'preprocessed/**/*.js',
    from: [/__BUILD_ENV__/g, /__VERSION__/g],
    to: [environment, `"${newVersion}"`],
  })

  // Write package.json back to file with updated version
  fs.writeFileSync('package.json', JSON.stringify(package, null, 2))

  console.log('Successfully preprocessed: ' + newVersion)
} catch (error) {
  console.error('Error occurred:', error)
}
console.log()
