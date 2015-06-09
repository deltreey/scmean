# scmean
Source Control Manager and CI Server on the MEAN stack

[![travis ci](https://travis-ci.org/deltreey/scmean.svg?branch=master)][1]
[![bitHound Score](https://www.bithound.io/github/deltreey/scmean/badges/score.svg?)][2]

## Installing SCMEAN

You need git running as a daemon, so install git, nodejs, and mongodb.  As long as mongodb is running, the following commands should get you up and running with the server on `http://localhost:8080`.  I recommend using git with screen as below, but if you want to ditch the screen command, you have to open a session for the daemon and a session for npm.

```bash
export BASE_GIT_DIR=/git/
/usr/bin/git daemon --export-all --user=git --base-path=$BASE_GIT_DIR --verbose --enable=receive-pack  $BASE_GIT_DIR
# then open a new shell, or use screen above
export SCMEAN_URL=example.org
npm install --production
npm start --production
```

[1]: https://travis-ci.org/deltreey/scmean
[2]: https://www.bithound.io/github/deltreey/scmean
