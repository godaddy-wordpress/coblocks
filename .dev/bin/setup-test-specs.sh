#!/usr/bin/env bash

# Allow files to be passed into the script
CHANGEDFILES=${@-$(git diff --name-only origin/master)}
SPECS=()
SPECSTRING=''

for FILE in $CHANGEDFILES
do
  # Changed file matches /src/blocks/*
  if [[ $FILE == *"src/blocks/"* ]]; then
    testSpec=$(echo $FILE | cut -d'/' -f3)
		foundwords=$(echo ${SPECS[@]} | grep -o "${testSpec}" | wc -w)
		# The test spec does not yet exist in the SPECS array
		if [[ "${foundwords}" -eq 0 ]]; then
			# Spec file string is empty, do not start string with a ,
			if [[ ${#SPECSTRING} -eq 0 ]]; then
				SPECSTRING="src/blocks/${testSpec}/**/*.cypress.js"
			else
				SPECSTRING="${SPECSTRING},src/blocks/${testSpec}/**/*.cypress.js"
			fi
			SPECS=( "${SPECS[@]}" "${testSpec}" )
		fi
  fi
  
  # Changed file matches /src/extensions/*
  if [[ $FILE == *"src/extensions/"* ]]; then
    testSpec=$(echo $FILE | cut -d'/' -f3)
		foundwords=$(echo ${SPECS[@]} | grep -o "${testSpec}" | wc -w)
		# Catch cases where no cypress spec file exists. 
		if [[ $(ls -l src/extensions/${testSpec}/**/*.cypress.js | wc -l) -eq 0 ]]; then
			continue
		fi
		# The test spec does not yet exist in the SPECS array
		if [[ "${foundwords}" -eq 0 ]]; then
			# Spec file string is empty, do not start string with a comma
			if [[ ${#SPECSTRING} -eq 0 ]]; then
				SPECSTRING="src/extensions/${testSpec}/**/*.cypress.js"
			else
				SPECSTRING="${SPECSTRING},src/extensions/${testSpec}/**/*.cypress.js"
			fi
			SPECS=( "${SPECS[@]}" "${testSpec}" )
		fi
  fi
done

# No spec files to run
if [ ${#SPECS[@]} -eq 0 ]; then
	echo "Changes do not require testing."
	circleci-agent step halt
	exit
fi

printf "\n\033[0;33mRunning the following Cypress spec files: ${SPECS[*]}\033[0m\n"

# Store $SPECSTRING value in /tmp/specstring file for later use
echo $SPECSTRING > /tmp/specstring
