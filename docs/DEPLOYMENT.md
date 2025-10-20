# Deployment Guide

This guide covers deploying Echoji to production using Docker and Nginx Proxy Manager.

## Prerequisites

- Ubuntu/Debian server with Docker and Docker Compose installed
- Domain name (echoji.co) pointing to your server
- Nginx Proxy Manager installed and running
- Ports 80 and 443 open for web traffic

## Step 1: Server Setup

### Install Docker

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add your user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo apt install docker-compose -y

# Verify installation
docker --version
docker-compose --version
```

## Step 2: Deploy Application

### Clone and Build

```bash
# Navigate to your deployment directory
cd /root  # or wherever you prefer

# Clone the repository (or copy files)
# git clone <your-repo-url> echoji-landing
# cd echoji-landing

# Or if copying files manually:
mkdir echoji-landing
cd echoji-landing
# Copy all project files here

# Build and start the container
docker-compose up -d --build

# Verify it's running
docker-compose ps
docker-compose logs -f
```

The application should now be running on port 8888.

## Step 3: Configure Nginx Proxy Manager

### Access Nginx Proxy Manager

1. Open your Nginx Proxy Manager web interface (usually at `http://your-server-ip:81`)
2. Login with your credentials

### Create Proxy Host

1. **Click "Proxy Hosts" → "Add Proxy Host"**

2. **Details Tab:**
   - Domain Names: `echoji.co`, `www.echoji.co`
   - Scheme: `http`
   - Forward Hostname / IP: `localhost` (or Docker container IP)
   - Forward Port: `8888`
   - Cache Assets: ✓ (enabled)
   - Block Common Exploits: ✓ (enabled)
   - Websockets Support: ✓ (enabled)

3. **SSL Tab:**
   - SSL Certificate: Request a new SSL Certificate
   - Force SSL: ✓ (enabled)
   - HTTP/2 Support: ✓ (enabled)
   - HSTS Enabled: ✓ (enabled)
   - Email Address: your-email@example.com
   - Agree to Let's Encrypt Terms: ✓

4. **Advanced Tab (Optional):**
   ```nginx
   # Cache static assets
   location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }

   # Don't cache HTML files
   location ~* \.html$ {
       expires -1;
       add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
   }

   # Security headers
   add_header X-Frame-Options "SAMEORIGIN" always;
   add_header X-Content-Type-Options "nosniff" always;
   add_header X-XSS-Protection "1; mode=block" always;
   ```

5. **Click "Save"**

## Step 4: DNS Configuration

Ensure your domain's DNS records point to your server:

```
A     echoji.co         →  YOUR_SERVER_IP
A     www.echoji.co     →  YOUR_SERVER_IP
```

Wait for DNS propagation (can take up to 48 hours, usually much faster).

## Step 5: Verify Deployment

1. **Test HTTP redirect to HTTPS:**
   ```bash
   curl -I http://echoji.co
   # Should return 301/302 redirect to https://
   ```

2. **Test HTTPS:**
   ```bash
   curl -I https://echoji.co
   # Should return 200 OK
   ```

3. **Visit in browser:**
   - https://echoji.co
   - https://www.echoji.co

4. **Check SSL certificate:**
   ```bash
   echo | openssl s_client -connect echoji.co:443 2>/dev/null | openssl x509 -noout -dates
   ```

## Maintenance

### View Logs

```bash
# Application logs
docker-compose logs -f

# Last 100 lines
docker-compose logs --tail=100

# Nginx Proxy Manager logs
docker logs nginx-proxy-manager
```

### Update Application

```bash
cd /root/echoji-landing

# Pull latest changes (if using git)
git pull

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

### Restart Application

```bash
docker-compose restart
```

### Stop Application

```bash
docker-compose down
```

## Troubleshooting

### Port 8888 Already in Use

```bash
# Find what's using port 8888
sudo lsof -i :8888

# Kill the process or change the port in docker-compose.yml
```

### Container Won't Start

```bash
# Check logs
docker-compose logs

# Remove and rebuild
docker-compose down -v
docker-compose up -d --build
```

### SSL Certificate Issues

1. Verify DNS is pointing to your server
2. Ensure ports 80 and 443 are open
3. Check Nginx Proxy Manager logs
4. Try requesting certificate again in NPM

### "Blocked request" Error

This means Vite's allowedHosts isn't configured correctly:

1. Check `vite.config.ts` has your domain in `preview.allowedHosts`
2. Rebuild the Docker container: `docker-compose up -d --build`

## Security Recommendations

1. **Keep Docker Updated:**
   ```bash
   sudo apt update && sudo apt upgrade
   ```

2. **Enable Firewall:**
   ```bash
   sudo ufw allow 22/tcp    # SSH
   sudo ufw allow 80/tcp    # HTTP
   sudo ufw allow 443/tcp   # HTTPS
   sudo ufw enable
   ```

3. **Regular Backups:**
   - Backup your docker-compose.yml and .env files
   - Backup Nginx Proxy Manager configuration

4. **Monitor Resources:**
   ```bash
   docker stats
   ```

## Performance Optimization

### Enable Gzip in Nginx Proxy Manager

Add to Advanced configuration:

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json image/svg+xml;
```

### Docker Resource Limits

Add to docker-compose.yml:

```yaml
services:
  echoji-frontend:
    # ... other config
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

## Monitoring

### Health Check

Create a simple health check endpoint or monitor:

```bash
# Check if container is running
docker-compose ps

# Check if port is responding
curl -I https://echoji.co

# Create a cron job for monitoring
echo "*/5 * * * * curl -s https://echoji.co > /dev/null || echo 'Echoji is down!' | mail -s 'Alert' your-email@example.com" | crontab -
```
