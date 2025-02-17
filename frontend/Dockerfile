# Stage 1: Build the Next.js application using pnpm
FROM node:20 AS builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@latest

# Copy dependency files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the application and build
COPY . .
RUN pnpm run build

# Stage 2: Create the production image
FROM node:20 AS runner

WORKDIR /app

# Install pnpm globally in the final image
RUN npm install -g pnpm@latest

# Copy built app and node_modules from builder
COPY --from=builder /app . 

# Set environment variables
ENV PORT=3000
EXPOSE 3000

# Start the Next.js app
CMD ["pnpm", "start"]
