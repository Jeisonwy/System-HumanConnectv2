pipeline {
    agent any

    environment {
        COMPOSE_FILE = "docker-compose.yml"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker-compose up -d --force-recreate frontend backend'
            }
        }

        stage('Run Tests with Coverage') {
            steps {
                sh '''
                    echo "Ejecutando pruebas con cobertura..."
                    docker-compose exec backend pytest --cov=. --cov-report=xml
                '''
            }
        }

        stage('Copy Coverage File') {
            steps {
                echo 'Copiando coverage.xml desde el contenedor...'
                sh '''
                    CONTAINER_ID=$(docker-compose ps -q backend)
                    docker cp $CONTAINER_ID:/app/coverage.xml ./coverage.xml
                    echo "Archivo coverage.xml copiado exitosamente."
                '''
            }
        }

        stage('Upload to Codecov') {
            steps {
                echo 'Enviando coverage a Codecov...'
                withCredentials([string(credentialsId: 'codecov-token', variable: 'CODECOV_TOKEN')]) {
                    sh '''
                        curl -s https://codecov.io/bash > codecov.sh
                        chmod +x codecov.sh
                        bash codecov.sh -t $CODECOV_TOKEN -f coverage.xml
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completado con éxito.'
        }
        failure {
            echo 'Fallo en el pipeline.'
        }
    }
}
