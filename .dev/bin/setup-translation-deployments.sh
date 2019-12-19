#!/usr/bin/env bash

UPDATED_TRANSLATONS=false
CHANGEDFILES=$(git log --pretty=format: --name-only --since="1 days ago" | sort | uniq)
regexp="languages\/[a-z_.A-Z]+json"
pkgjson=$(jq 'del(.locales[])' package.json)

for FILE in $CHANGEDFILES
do
  if [[ $FILE =~ $regexp ]]; then
    locale=$(echo $FILE | cut -d'/' -f2 | cut -d'.' -f1)
    if [[ $locale != 'coblocks' ]]; then
      UPDATED_TRANSLATONS=true
      pkgjson=$(echo $pkgjson | jq '.locales=(.locales + {"'${locale}'": ""})')
    fi
  fi
done

if [ "$UPDATED_TRANSLATONS" = false ]; then
  circleci-agent step halt
fi

echo $pkgjson | jq . > package.json

printf "\n\033[0;33mpackage.json locales updated. Deploying the following translations:\033[0m\n"
jq -r '.locales|keys|join(", ")' package.json
printf "\n"
