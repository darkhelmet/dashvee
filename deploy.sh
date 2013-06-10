#!/usr/bin/env bash

set -e

if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]; then
    echo "This is a pull request. No deployment will be done."
    exit 0
fi

if [[ "$TRAVIS_BRANCH" == "master" ]]; then
    # Install the heroku toolbelt
    wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh

    # Setup git
    git remote add heroku heroku.com:pacific-sea-4560.git
    echo "Host heroku.com" >> ~/.ssh/config
    echo "   StrictHostKeyChecking no" >> ~/.ssh/config
    echo "   CheckHostIP no" >> ~/.ssh/config
    echo "   UserKnownHostsFile=/dev/null" >> ~/.ssh/config

    # Setup heroku
    heroku keys:clear
    yes | heroku keys:add

    # PUSH IT
    yes | git push -f heroku master
fi

exit 0
