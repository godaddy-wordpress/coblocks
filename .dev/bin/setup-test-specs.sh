#!/usr/bin/env bash

function join { local IFS="$1"; shift; echo "$*"; }

CHANGEDFILES=$(git diff-tree --no-commit-id --name-only -r HEAD)

export SPECS=() >> $BASH_ENV
export SPECSTRING='' >> $BASH_ENV

for FILE in $CHANGEDFILES
do
  # Changed file matches /src/blocks/*
  if [[ $FILE == *"src/blocks/"* ]]; then
    testSpec=$(echo $FILE | cut -d'/' -f3)
    foundwords=$(echo ${SPECS[@]} | grep -o "${testSpec}" | wc -w)
    # There is a test file for the altered block
    if [ -f "src/blocks/${testSpec}/test/${testSpec}.cypress.js" ]; then
      # The test spec does not yet exist in the SPECS array
      if [[ "${foundwords}" -eq 0 ]]; then
        # Spec file string is empty, do not start string with a ,
        if [[ ${#SPECSTRING} -eq 0 ]]; then
          SPECSTRING="src/blocks/${testSpec}/test/${testSpec}.cypress.js"
        else
          SPECSTRING="${SPECSTRING},src/blocks/${testSpec}/test/${testSpec}.cypress.js"
        fi
        SPECS=( "${SPECS[@]}" "src/blocks/${testSpec}/test/${testSpec}.cypress.js" )
      fi
    fi
  fi
done

if [ ${#SPECS[@]} -eq 0 ]; then
  circleci-agent step halt
fi

source $BASH_ENV
