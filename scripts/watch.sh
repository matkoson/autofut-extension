#!/usr/bin/env bash

source ./scripts/xargsContext.sh

set -e

printInfo "Running initial build!"
handleChange

fswatch -t "$PWD/src" | while read change; do xargs -I{} sh -c '. ./scripts/xargsContext.sh; handleChange "$change"'; done


