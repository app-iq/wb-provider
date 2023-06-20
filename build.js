const {execSync} = require('child_process');

execSync('rm -rf ./build/Examples');

function removeOldBuild() {
    execSync('rm -rf ./build');
}

function build() {
    execSync('tsc --noEmit false');
    execSync('mv ./build/src/* ./build');
}

function cleanupBuildFiles() {
    execSync('rm -rf ./build/src');
    const filesToDelete = [
        './build/jest.config.js',
        './build/jest.config.d.ts',
        './build/main.js',
        './build/main.d.ts',
    ];
    filesToDelete.forEach(file => execSync(`rm ${file}`));
}

removeOldBuild();
build();
cleanupBuildFiles();
