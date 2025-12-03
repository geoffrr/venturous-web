### Install Dependencies

```bash
yarn install
```

### Development Command

```bash
yarn run dev
```

### Build Command

```bash
yarn run build
```

### Build and Run With Docker

```bash
docker build -t venturous-web .
# or
# docker --build-arg INSTALLER=npm build -t venturous-web .
# or
# docker --build-arg INSTALLER=pnpm build -t venturous-web .

docker run -p 3000:80 venturous-web
# or
# docker run --rm -p 3000:80 venturous-web
```

To access the shell within the container:

```bash
docker run -it --rm venturous-web ash
```


## 🐞 Some originitating components from:

[Astroplate](https://github.com/zeon-studio/astroplate).
