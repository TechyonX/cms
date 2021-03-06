# TechyonX CMS

## Суурилуулах

Node package-уудыг суулгах

`yarn`

Шаардлагатай тохиолдолд тохиргооны `.env` файл үүсгэж тохируулах

`cp .env.example .env`

Хэрэв шаардлагатай ӨС байхгүй бол `mysql` суулгаад доорх командуудаар ӨС, хэрэглэгч, хэрэглэгчийн эрхүүдийг тохируулах

`create database techyonx;`

`create user 'techyonx'@'localhost' identified with mysql_native_password by 'techyonx';`

`grant all on techyonx.* to 'techyonx'@'localhost';`

Хөгжүүлэлт эхлүүлэх

`yarn build && yarn develop`

## Боломжит тушаалууд

`yarn develop` - Start Strapi in watch mode.

`yarn start` - Start Strapi without watch mode.

`yarn build` - Build Strapi admin panel.

`yarn strapi` - Display all available commands.

## Producion горимд ажиллуулах

1. Admin panel-г үүсгэнэ

`NODE_ENV=production yarn build`

2. Эхлүүлэх

`NODE_ENV=production yarn start`

### Systemd service

```
[Unit]
Description=TechyonX Strapi
After=network.target

[Service]
Environment=NODE_ENV=production
WorkingDirectory=/srv/techyonx/cms
ExecStart=/usr/bin/yarn start
Restart=on-failure

[Install]
WantedBy=default.target
```

---

[Strapi Documentation](https://strapi.io/documentation/v3.x/)
