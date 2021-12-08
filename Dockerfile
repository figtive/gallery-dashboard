FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
RUN ["npm", "ci"]
RUN ["npm", "run", "build"]

FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app/build /app/build
COPY --from=builder /app/package.json /app/package-lock.json /app/
RUN ["npm", "ci", "--production", "--ignore-scripts"]
CMD ["node", "build"]
