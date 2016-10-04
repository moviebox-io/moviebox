set -e  # Exit immediately if a command exits with a non-zero status.

npm run lint
npm run test:cover

# report coverage stats for non-PRs
if [[ -z $CI_PULL_REQUEST ]]; then
  cat ./coverage/lcov.info | ./node_modules/.bin/codecov
fi
