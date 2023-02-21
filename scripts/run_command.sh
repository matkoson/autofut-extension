#!/usr/bin/env bash

function run_command () {
  "$@"
  local status=$?
  if [ $status -ne 0 ]; then
    printError "Error: $1 failed with exit status $status"
    exit 1
  fi
  return $status
}
