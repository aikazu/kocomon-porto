# Iqbal Attila — Portfolio

## Scripts

- dev: start local server on http://localhost:3002
- build/start: production build and serve

## Deploy

Virtualhost
```bash
sudo nano /etc/nginx/sites-available/me.kcmon.id
```

Config
```nginx
server {
    listen 80;
    listen [::]:80;

    server_name me.kcmon.id www.me.kcmon.id;

    root /var/www/me.kcmon.id/.next;

    access_log /var/log/nginx/me.kcmon.id.access.log;
    error_log /var/log/nginx/me.kcmon.id.error.log;

    location / {
        proxy_pass http://localhost:3002;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```
Apply Virtualhost
```bash
sudo ln -s /etc/nginx/sites-available/me.kcmon.id /etc/nginx/sites-enabled/
sudo nginx -s reload
```
