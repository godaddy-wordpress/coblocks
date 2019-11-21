#!/usr/bin/env bash

function join { local IFS="$1"; shift; echo "$*"; }

CHANGEDFILES=$(git diff-tree --no-commit-id --name-only -r HEAD)
SPECS=()
SPECSTRING=''

for FILE in $CHANGEDFILES
do
  # Changed file matches /src/blocks/*
  if [[ $FILE == *"src/blocks/"* ]]; then
    testSpec=$(echo $FILE | cut -d'/' -f3)
    # There is a test file for the altered block
    if [ -f "src/blocks/${testSpec}/test/${testSpec}.cypress.js" ]; then
      foundwords=$(echo ${SPECS[@]} | grep -o "${testSpec}" | wc -w)
      # The test spec does not yet exist in the SPECS array
      if [[ "${foundwords}" -eq 0 ]]; then
        # Spec file string is empty, do not start string with a ,
        if [[ ${#SPECSTRING} -eq 0 ]]; then
          SPECSTRING="src/blocks/${testSpec}/test/${testSpec}.cypress.js"
        else
          SPECSTRING="${SPECSTRING},src/blocks/${testSpec}/test/${testSpec}.cypress.js"
        fi
        SPECS=( "${SPECS[@]}" "${testSpec}" )
      fi
    fi
  fi
done

if [ ${#SPECS[@]} -eq 0 ]; then
  circleci-agent step halt
fi

GREEN='\033[0;33m'
NC='\033[0m'
printf "\n${GREEN}Running the following Cypress spec files: ${SPECS[@]}${NC}\n"

# Store $SPECSTRING value in /tmp/specstring file for later use
echo $SPECSTRING > /tmp/specstring
