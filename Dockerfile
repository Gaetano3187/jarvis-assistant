# ---- Base image ------------------------------------------------------------
FROM node:20-alpine AS base
WORKDIR /app

# ---- Dipendenze ------------------------------------------------------------
COPY package*.json ./
RUN npm install --legacy-peer-deps

# ---- Sorgente e build ------------------------------------------------------
COPY . .
RUN npm run build

# ---- Runtime (immagine finale) ---------------------------------------------
FROM node:20-alpine
WORKDIR /app

# Copio solo ciò che serve dal layer di build
COPY --from=base /app ./

EXPOSE 3000
CMD ["npm", "start"]
