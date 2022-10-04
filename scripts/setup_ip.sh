LOCAL_IP=$(ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1' | tail -n 1)
cp .env.local.default .env.local
replace "35.88.136.224" ${LOCAL_IP} -- .env.local
