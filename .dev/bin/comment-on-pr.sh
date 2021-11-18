#!/usr/bin/env bash

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

success() {
  echo -e "${GREEN}Success:${NC} $1"
}

error() {
  echo -e "${RED}Error:${NC} $1"
}

PR_URL=${CIRCLE_PULL_REQUEST}
PR_ID=${PR_URL##*/}

if [[ -z "${GH_AUTH_TOKEN}" ]]; then
  error "GH_AUTH_TOKEN is not set"
  exit 1
fi

if [[ -z "$PR_ID" ]]; then
  error "This is not a pull request"
  exit 0
fi

GH_LOGIN=$(curl -sS -H "Authorization: token $GH_AUTH_TOKEN" https://api.github.com/user | jq '.login' --raw-output)
success "Successfully authenticated with $GH_LOGIN"

git config github.user $GH_LOGIN

success "Pull Request ID: $PR_ID"

PREV_BUILD_ID=$(cat ~/project/build-num.txt)
ARTIFACT_URL=$(curl -sS -H "Circle-Token: $CIRCLE_TOKEN" "https://circleci.com/api/v1.1/project/gh/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/$PREV_BUILD_ID/artifacts" | jq .[0].url | tr -d "\042")

if [ -z "$ARTIFACT_URL" ]; then
  error "Could not get the artifact URL"
  exit 1
fi

success "Article URL Found - $ARTIFACT_URL"

COMMENT_BODY="Download $CIRCLE_PROJECT_REPONAME.zip: $ARTIFACT_URL"

BOT_COMMENTS=$(curl -sS \
  -u $GH_LOGIN:$GH_AUTH_TOKEN \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/issues/$PR_ID/comments")

COMMENT=$(echo $BOT_COMMENTS | jq '.[-1]')

# Bot has not commented on the issue, create new comment
if [ 'null' == "$COMMENT" ]; then
  success "Posting new comment."
  NEW_COMMENT=$(curl -sS \
    -X POST \
    -u $GH_LOGIN:$GH_AUTH_TOKEN \
    -H "Accept: application/vnd.github.v3+json" \
    "https://api.github.com/repos/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/issues/$PR_ID/comments" \
    -d "{\"body\": \"$COMMENT_BODY\"}")
  exit 1
fi

success "Updating existing comment."

COMMENT_ID=$(echo $COMMENT | jq '.id');

if [ -z "$COMMENT_ID" ]; then
  error "Comment ID not found."
  exit 1
fi

NEW_COMMENT=$(curl -sS \
  -X PATCH \
  -u $GH_LOGIN:$GH_AUTH_TOKEN \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/issues/comments/$COMMENT_ID" \
  -d "{\"body\": \"$COMMENT_BODY\"}")

success "Done."
