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
                echo 'Ejecutando tests con coverage...'
                sh 'docker-compose exec backend pytest --cov=. --cov-report=xml'
            }
        }

        stage('Upload to Codecov') {
            steps {
                echo 'Enviando coverage a Codecov...'
                withCredentials([string(credentialsId: 'codecov-token', variable: 'CODECOV_TOKEN')]) {
                    sh '''
                        curl -s https://codecov.io/bash > codecov.sh
                        bash codecov.sh -t $CODECOV_TOKEN -f /app/coverage.xml
                    '''
                }
            }
        }
    }

    post {
        success { echo 'Pipeline completado con éxito.' }
        failure { echo 'Fallo en el pipeline.' }
    }
}
