#!/usr/bin/env bash

source ./.env
source ./scripts/run_command.sh
source ./scripts/print.sh

printInfo "Mounting NAS!"
mount_smbfs //matkoson@192.168.0.209/ndev /Volumes/ndev

printInfo "Updating NAS!"

run_command cp -r "$PWD"/extension/ "$AUTOFUT_NAS_PATH/"
