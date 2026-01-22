# TestLink Test Management System

This folder contains TestLink setup or alternative test management solutions.

## Current Setup Status

✅ Docker containers are running:
- MariaDB database (localhost:3306)
- PHP Apache server (localhost:80)

## Quick Start

Containers are already running. To stop them:

```bash
docker-compose down
```

To restart:

```bash
docker-compose up -d
```

## ⚠️ Next Steps Required

Since the official TestLink Docker images aren't publicly available, you have two options:

### Option 1: Install TestLink Manually
1. Download TestLink source: https://sourceforge.net/projects/testlink/files/
2. Extract to the container's `/var/www/html`
3. Run the installation wizard at http://localhost

### Option 2: Use Alternative (Recommended)
Consider using **Allure TestOps** or **Zephyr Scale** which have better Docker support.

## Database Connection
- **Host:** testlink-db (localhost:3306 from your machine)
- **User:** testlink
- **Password:** testlink_pass
- **Database:** testlink

## Accessing Services
- PHP/Web Server: http://localhost
- MySQL: localhost:3306

## Logs
```bash
docker-compose logs -f testlink
docker-compose logs -f testlink-db
```

## Stop All Services
```bash
docker-compose down -v  # -v removes volumes too
```

