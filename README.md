# Mini Blog website

Ce projet est une petite application fullstack pour mon école, il n'y a pas de technologies complexes c'est de la simple mise en page avec une base de donnée en JSON pour minimiser l'app.

Il faudra docker et docker-compose pour faciliter le lancement des deux serveurs.d.

## Prérequis

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Structure

Ce projet est composé de deux services :

- **API** : Serveur Node.js pour l'API, accessible sur le port `3001`.
- **Web** : Frontend (Blog), accessible sur le port `4173` ou `3002`.

## Configuration des services

Le fichier `docker-compose.yml` contient la configuration suivante :

```yaml
services:
  api:
    build:
      context: ./Mini-Blog-website
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
    networks:
      - webnet
    
  web:
    build:
      context: ./Blog-Website
      dockerfile: Dockerfile
    ports:
      - "4173:4173"
    environment:
      - NODE_ENV=production
      - PORT=4173
    networks:
      - webnet

networks:
  webnet:
```

## Lancer le projet

Pour démarrer l'application, exécutez le script `startApp.sh` :

```bash
./startApp.sh
```

*Contenu de startApp.sh*:
```bash
docker-compose build
docker-compose up -d
```

Cela démarrera à la fois l'API et le frontend via Docker Compose.

## Accès aux services

- **Frontend (Blog)** : [http://localhost:4173](http://localhost:4173)
- **API** : [http://localhost:3001](http://localhost:3001)

## Notes

- Le réseau `webnet` permet une communication interne entre les services.
- Assurez-vous que les ports `3001` et `4173` sont libres avant de démarrer les services.