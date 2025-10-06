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
          withCredentials([usernamePassword(credentialsId: 'docker-hub-creds',
            passwordVariable: 'DOCKER_PASSWORD',
            usernameVariable: 'DOCKER_USERNAME')]) {
            sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
            sh "docker-compose build web"
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
          sh "docker stop node-web node-mongo-db || true"
          sh "docker rm node-web node-mongo-db || true"
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