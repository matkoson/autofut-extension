#!/bin/bash -x

source ./scripts/print.sh
source ./scripts/run_command.sh
source ./.env

# Get the destination path from the environment variable
destination_path=$AUTOFUT_NAS_PATH

printInfo "Updating NAS timestamp file!"

# create a timestamp file
timestamp=$(date +%Y-%m-%d:::%H-%M-%S)
timestamp_file="$timestamp.txt"

printInfo "New timestamp: $timestamp"
mkdir -p "$PWD/temp/last_update"
touch "$PWD/temp/last_update/$timestamp_file"
rsync --delete -r "$PWD/temp/last_update" "$destination_path/"

printInfo "Cleaning /temp folder!"
run_command rm -rf "$PWD/temp"
printInfo "✅✅✅ Done! ✅✅✅"
