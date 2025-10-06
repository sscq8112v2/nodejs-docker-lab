pipeline {
  agent any

  environment {
    DOCKER_REGISTRY = 'sscq8112'
  }

  stages {
    stage('Checkout Source') {
      steps {
        checkout scm
      }
    }

    stage('Build & Push Docker Images') {
      steps {
        script {
          withCredentials([usernamePassword(
            credentialsId: 'docker-hub-creds',
            usernameVariable: 'DOCKER_USERNAME',
            passwordVariable: 'DOCKER_PASSWORD'
          )]) {
            // Secure Docker login
            bat "echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin"

            // Build Docker image
            bat "docker build -t %DOCKER_REGISTRY%/my-nodejs-app:%BUILD_NUMBER% ."

            // Push image
            bat "docker push %DOCKER_REGISTRY%/my-nodejs-app:%BUILD_NUMBER%"
          }
        }
      }
    }

    stage('Deploy Multi-Container App') {
      steps {
        script {
          // Stop and remove old containers
          bat "docker stop node-web node-mongo-db || exit 0"
          bat "docker rm node-web node-mongo-db || exit 0"

          // Recreate containers
          bat "docker-compose up -d --force-recreate"
        }
      }
    }
  }

  post {
    always {
      cleanWs()
    }
  }
}