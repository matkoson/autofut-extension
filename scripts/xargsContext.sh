#!/usr/bin/env bash

source ./scripts/print.sh

function handleChange(){
  yarn emit
  printInfo "Build completed!"
  printInfo "Last successful build at: $(date)"
  yarn updateNas
  printInfo "Last successful NAS update at: $(date)"
  yarn updateRemoteTimestamp
}
