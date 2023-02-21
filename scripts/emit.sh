#!/usr/bin/env bash

source ./scripts/xargsContext.sh
source ./scripts/run_command.sh


printInfo "Cleaning up!"
run_command yarn clean

printInfo "Transpiling TypScript!"
run_command yarn build

printInfo "Bundling with Vite!"
run_command yarn vite

printInfo "Generating bundle!"
run_command mv dist/vite/bundle.js.umd.js dist/vite/bundle.js

printInfo "Updating source maps filename in 'bundle.js'..."
sed -i '' 's/\/\/# sourceMappingURL=bundle.js.umd.js.map/\/\/# sourceMappingURL=bundle.js.map/' dist/vite/bundle.js

printInfo "Replacing previous bundle!"
run_command cp dist/vite/bundle.js extension/content_scripts/bundle.js


printInfo "Emitting source maps!"
run_command mv dist/vite/bundle.js.umd.js.map dist/vite/bundle.js.map
run_command cp dist/vite/bundle.js.map extension/content_scripts/bundle.js.map



printInfo "Replacing manifest.json!"
run_command cp ./src/manifest.json extension/
