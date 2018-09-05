rm -r ./dist
yarn run build--production
ssh ramon@192.168.10.45 'rm -rf /var/www/nations/*'
scp -r ./dist ramon@192.168.10.45:/var/www/nations
scp -r ./images ramon@192.168.10.45:/var/www/nations
scp ./index.html ramon@192.168.10.45:/var/www/nations
scp ./style.css ramon@192.168.10.45:/var/www/nations
scp ./theme.css ramon@192.168.10.45:/var/www/nations
echo 'Deploy Complete'
