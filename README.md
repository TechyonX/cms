# TechyonX CMS

## Суурилуулах

Node package-уудыг суулгах

`yarn`

Шаардлагатай тохиолдолд тохиргооны `.env` файл үүсгэж тохируулах

`cp .env.example .env`

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

---

[Strapi Documentation](https://strapi.io/documentation/v3.x/)