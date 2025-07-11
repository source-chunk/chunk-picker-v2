#!/bin/sh

JSON_FILE="chunkpicker-chunkinfo-export.json"

if [ ! -f "$JSON_FILE" ]; then
  echo "JSON file not found: $JSON_FILE"
  exit 1
fi

if ! jq empty "$JSON_FILE" > /dev/null 2>&1; then
  echo "Invalid JSON in $JSON_FILE"
  jq empty "$JSON_FILE" 2>&1
  exit 1
fi
