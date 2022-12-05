printf '\nExecute build script for STG...\n'

cd server && rm -rf build;

cd ../client && yarn && yarn run build-stg;

mv build ../server;

cd ../server && flyctl deploy;

printf '\nBuild STG successfully!'

