# Deployment
- Signup on AWS
- Launch Instance
- chmod 400 <secret>.pem
- ssh -i "devTinder-secret.pem" ubuntu@ec2-13-53-127-103.eu-north-1.compute.amazonaws.com
- install node version 22.17.1
- Git clone
- Frontend
    - npm install -> dependencies install
    - npm run build
    - sudo apt update (for update the system or ubuntu)
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - copy code from dist(build files) to /var/www/html
    - sudo scp -r /var/www/html
    - Enable port :80 of your instance

- Backend
    - allowed ec2 instance public IP on mongodb server
    - npm install pm2 -g
    - pm2 start npm -- start
    - pm2 logs
    - pm2 list, pm2 flush <name>, pm2 stop <name>, pm2 delete <name>
    - config ngnix - /etc/nginx/sites-available/default
    - restart nginx - sudo systemctl restart nginx
    - Modify the BASEURL in frontend project to "/api"

# Ngnix Config:

    - Frontend = http://13.53.127.103/
    - Backend = http://13.53.127.103:7777/

    - Domain name = devtinder.com => 13.53.127.103

    - Frontend = devTinder.com
    - Backend = devTinder.com:7777 => devTinder.com/api

    - nginx config:

    - server_name 13.53.127.103;

    - location /api/ {
       - proxy_pass http://localhost:7777/;
       - proxy_http_version 1.1;
       - proxy_set_header Upgrade $http_upgrade;
       - proxy_set_header Connection 'upgrade';
       - proxy_set_header Host $host;
       - proxy_cache_bypass $http_upgrade;
    }