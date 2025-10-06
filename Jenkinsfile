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
            sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin"

            // Build Docker image
            sh "docker-compose build web"

            // Tag and push image
            def imageTag = "${DOCKER_REGISTRY}/my-nodejs-app:${env.BUILD_NUMBER}"
            sh "docker tag my-nodejs-app:${env.BUILD_NUMBER} ${imageTag}"
            sh "docker push ${imageTag}"
          }
        }
      }
    }

    stage('Deploy Multi-Container App') {
      steps {
        script {
          // Stop and remove old containers
          sh "docker stop node-web node-mongo-db || true"
          sh "docker rm node-web node-mongo-db || true"

          // Recreate containers with updated image
          withEnv(["BUILD_NUMBER=${env.BUILD_NUMBER}"]) {
            sh "docker-compose up -d --force-recreate"
          }
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