# Stage 1: Build the NestJS application using pnpm
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@latest

# Copy dependency files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Generate Prisma Client with correct binary target
RUN pnpm exec prisma generate

# Build NestJS
RUN pnpm run build

# Stage 2: Create the production image
FROM node:20 AS runner

WORKDIR /app

# Install pnpm globally in the final image
RUN npm install -g pnpm@latest

# Copy built app and node_modules from builder
COPY --from=builder /app . 

# Set environment variables
ENV PORT=4000
ENV DATABASE_URL=postgresql://admin:password@db:5432/asteroids

EXPOSE 4000

# Start the NestJS application
CMD ["pnpm", "start"]
