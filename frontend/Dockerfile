# -----------------------------
# 1️⃣ Build Stage
# -----------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy only package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy source code
COPY . .

# Build the Vite app (creates /dist)
RUN npm run build


# -----------------------------
# 2️⃣ Runtime Stage
# -----------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only the built output and necessary files
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Install only production deps
RUN npm i --omit=dev

# Expose the Vite preview port
EXPOSE 4173

# Run vite preview server
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
