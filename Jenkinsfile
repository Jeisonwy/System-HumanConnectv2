pipeline {
    agent any

    environment {
        COMPOSE_FILE = "docker-compose.yml"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Clonando el repositorio...'
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                echo 'Construyendo las imágenes Docker...'
                sh 'docker-compose build'
            }
        }

        stage('Run Containers') {
            steps {
                echo 'Levantando los contenedores...'
                sh 'docker-compose down'
                sh 'docker-compose up -d'
            }
        }

        stage('Verify Services') {
            steps {
                echo 'Verificando servicios activos...'
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo 'Despliegue completado correctamente.'
        }
        failure {
            echo 'Error durante la ejecución del pipeline.'
        }
    }
}