REM build hugo site, if successful deploy to s3 bucket
hugo && aws s3 sync C:/hugo/sites/bedlamhaus/public s3://bedlamhaus --acl public-read