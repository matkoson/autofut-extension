#!/usr/bin/env bash

function printInfo() {
  log_length=80
  padding=$(((log_length - 2 - ${#1}) / 2))
  padding_string=""
  for i in $(seq 1 $padding); do
    padding_string="$padding_string#"
  done
  echo "\nℹ️  \x1b[34;1;3m#################### $1\n"

}

function printError() {
  log_length=80
  padding=$(((log_length - 2 - ${#1}) / 2))
  padding_string=""
  for i in $(seq 1 $padding); do
    padding_string="$padding_string#"
  done
  echo "\n🛑  \x1b[31;1;3m#################### $1\n"
}
