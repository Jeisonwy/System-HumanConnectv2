FROM jenkins/jenkins:lts

USER root

# Instalar Docker CLI y Docker Compose
RUN apt-get update && \
    apt-get install -y docker.io curl && \
    curl -L "https://github.com/docker/compose/releases/download/v2.21.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

# Volver a usuario jenkins
USER jenkins
