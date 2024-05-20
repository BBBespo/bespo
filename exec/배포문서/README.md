
## 서비스 버전 정보
* jdk 17
* SpringBoot 3.1.10
* React
* TypeScript
* MySQL
* EC2
* node.js 20.10
* Jenkins
* Nginx
* Docker

<br><br><br>

## Nginx Configuration
### nginx - bespo.conf
```

server {
  listen 80; #80포트로 받을 때
  server_name bespo.co.kr;
  return 301 https://bespo.co.kr$request_uri;

}

map $http_upgrade $connection_upgrade {
  default upgrade;
  '' close;
}

server {
  listen 443 ssl http2;
  server_name dev.bespo.co.kr;
  # ssl 인증서 적용하기
  ssl_certificate /etc/letsencrypt/live/dev.bespo.co.kr/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/dev.bespo.co.kr/privkey.pem;

  ignore_invalid_headers off;

  location / {
    proxy_pass http://localhost:3010;
  }
}

server {
  listen 443 ssl http2;
  server_name bespo.co.kr;

  # ssl 인증서 적용하기
  ssl_certificate /etc/letsencrypt/live/bespo.co.kr/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/bespo.co.kr/privkey.pem;

  ignore_invalid_headers off;

  location / {
    proxy_pass http://localhost:3000;
  }

  location /api { # location 이후 특정 url을 처리하는 방법을 정의
    proxy_pass http://localhost:8080/api; # Request에 대해 어디로 리다이렉트하는지
    proxy_redirect off;
    charset utf-8;

    proxy_http_version 1.1;
    proxy_set_header Connection "upgrade";
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-NginX-Proxy true;
  }

  location /test/api {
    proxy_pass http://localhost:8081/api; # Request에 대해 어디로 리다이렉트하는지
    proxy_redirect off;
    charset utf-8;

    proxy_http_version 1.1;
    proxy_set_header Connection "upgrade";
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-NginX-Proxy true;
  }

  location /jenkins {
    proxy_pass http://localhost:9090;
    proxy_redirect off;
    proxy_http_version 1.1;

    # Required for Jenkins websocket agents
    proxy_set_header   Connection        "upgrade";
    proxy_set_header   Upgrade           $http_upgrade;
    proxy_set_header   Host              $http_host;
    proxy_set_header   X-Real-IP         $remote_addr;
    proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header   X-Forwarded-Proto $scheme;
    proxy_set_header   X-NginX-Proxy true;
    proxy_max_temp_file_size 0;

    #this is the maximum upload size
    client_max_body_size       10m;
    client_body_buffer_size    128k;

    proxy_connect_timeout      90;
    proxy_send_timeout         90;
    proxy_read_timeout         90;
    proxy_request_buffering    off; # Required for HTTP CLI commands
    proxy_set_header Connection ""; # Clear for keepalive
  }
}


```
_________

<br>
<br>

## Jenkins Pipeline
### Jenkins SpringBoot Deploy-BE Pipeline
```
pipeline { 
    tools {
        gradle 'gradle'
    }
    environment { 
        repository = "hyeseungs/bespo"  
        DOCKERHUB_CREDENTIALS = credentials('docker-hub-token')
        SECRET_FILE = credentials('deploy-secret-file')
        dockerImage = '' 
    }
    agent any 
    stages { 
        stage('Git clone') {
            steps {
                git branch: 'deploy/back', credentialsId: 'gitlab', url: 'https://lab.ssafy.com/s10-final/S10P31A606.git'
            }
        }
        
        stage('Replace Properties') {
            steps {
                script {
                    sh "cp $SECRET_FILE /var/jenkins_home/workspace/Bespo-Deploy-BE/backend/src/main/resources/application.properties"
                }
            }
        }
        
        stage('Build backend deploy') {
            steps {
                dir('backend') {
                    sh "chmod +x gradlew"
                    sh "./gradlew clean bootJar"
                }
            }
        }
        
        stage('Building our image') { 
            steps { 
                script { 
                    sh "cp /var/jenkins_home/workspace/Bespo-Deploy-BE/backend/build/libs/bespo-0.0.1-SNAPSHOT.jar /var/jenkins_home/workspace/Bespo-Deploy-BE/"
                    dockerImage = docker.build repository + ":$BUILD_NUMBER"
                }
            } 
        }
        stage('Login Dockerhub'){
            steps{
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        stage('Push') {
            steps {
                sh 'docker push $repository:$BUILD_NUMBER'
            }
        }
        stage('Pull') {
            steps {
                sh 'docker pull $repository:$BUILD_NUMBER'
            }
        }
        stage('stop prev container') {
            steps {
                sh 'docker stop deploy-back || true'
                sh 'docker rm deploy-back || true'
            }
        }
        stage('Run') {
            steps {
                sh 'docker run -d -p 8080:8080 --name deploy-back $repository:$BUILD_NUMBER'
            }
        }
    }
    post {
        always {
            sh 'docker logout'
        }
    }
}

```

### Jenkins SpringBoot Dev-BE Pipeline
```
pipeline { 
    tools {
        gradle 'gradle'
    }
    environment { 
        repository = "hyeseungs/bespo"  
        DOCKERHUB_CREDENTIALS = credentials('docker-hub-token')
        SECRET_FILE = credentials('dev-secret-file')
        dockerImage = '' 
    }
    agent any 
    stages { 
        stage('Git clone') {
            steps {
                git branch: 'dev/back', credentialsId: 'gitlab', url: 'https://lab.ssafy.com/s10-final/S10P31A606.git'
            }
        }
        
        stage('Replace Properties') {
            steps {
                script {
                    sh "cp $SECRET_FILE /var/jenkins_home/workspace/Bespo-Dev-BE/backend/src/main/resources/application.properties"
                }
            }
        }
        
        stage('Build backend dev') {
            steps {
                dir('backend') {
                    sh "chmod +x gradlew"
                    sh "./gradlew clean bootJar"
                }
            }
        }
        
        stage('Building our image') { 
            steps { 
                script { 
                    sh "cp /var/jenkins_home/workspace/Bespo-Dev-BE/backend/build/libs/bespo-0.0.1-SNAPSHOT.jar /var/jenkins_home/workspace/Bespo-Dev-BE/"
                    dockerImage = docker.build repository + ":$BUILD_NUMBER"
                }
            } 
        }
        stage('Login Dockerhub'){
            steps{
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        stage('Push') {
            steps {
                sh 'docker push $repository:$BUILD_NUMBER'
            }
        }
        stage('Pull') {
            steps {
                sh 'docker pull $repository:$BUILD_NUMBER'
            }
        }
        stage('stop prev container') {
            steps {
                sh 'docker stop dev-back || true'
                sh 'docker rm dev-back || true'
            }
        }
        stage('Run') {
            steps {
                sh 'docker run -d -p 8081:8081 --name dev-back $repository:$BUILD_NUMBER'
            }
        }
    }
    post {
        always {
            sh 'docker logout'
        }
    }
}

```
### Jenkins React Deploy-fe Pipeline
```
pipeline { 
    tools {
        nodejs 'node'
    }
    environment { 
        repository = "hyeseungs/bespo"  
        DOCKERHUB_CREDENTIALS = credentials('docker-hub-token')
        SECRET_FILE = credentials('deploy-fe-secret-file')
        dockerImage = '' 
    }
    agent any 
    stages { 
        stage('Git clone') {
            steps {
                git branch: 'deploy/front', credentialsId: 'gitlab', url: 'https://lab.ssafy.com/s10-final/S10P31A606.git'
            }
        }
        
        stage('Replace Env') {
            steps {
                script {
                    sh "cp $SECRET_FILE /var/jenkins_home/workspace/Bespo-Deploy-FE/frontend/.env"
                }
            }
        }
        
        stage('Build frontend deploy') {
            steps {
                dir('frontend') {
                    sh "npm install --legacy-peer-deps"
                    sh "CI=false npm run build"
                }
            }
        }
        
        stage('Building our image') { 
            steps { 
                dir('frontend') { 
                    script {
                        dockerImage = docker.build repository + ":$BUILD_NUMBER"
                    }
                }
            } 
        }
        stage('Login Dockerhub'){
            steps{
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        stage('Push') {
            steps {
                sh 'docker push $repository:$BUILD_NUMBER'
            }
        }
        stage('Pull') {
            steps {
                sh 'docker pull $repository:$BUILD_NUMBER'
            }
        }
        stage('stop prev container') {
            steps {
                sh 'docker stop deploy-front || true'
                sh 'docker rm deploy-front || true'
            }
        }
        stage('Run') {
            steps {
                sh 'docker run -d -p 3000:3000 --name deploy-front $repository:$BUILD_NUMBER'
            }
        }
    }
    post {
        always {
            sh 'docker logout'
        }
    }
}

```
### Jenkins React Dev-fe Pipeline
```
pipeline { 
    tools {
        nodejs 'node'
    }
    environment { 
        repository = "hyeseungs/bespo"  
        DOCKERHUB_CREDENTIALS = credentials('docker-hub-token')
        SECRET_FILE = credentials('dev-fe-secret-file')
        dockerImage = '' 
    }
    agent any 
    stages { 
        stage('Git clone') {
            steps {
                git branch: 'dev/front', credentialsId: 'gitlab', url: 'https://lab.ssafy.com/s10-final/S10P31A606.git'
            }
        }
        
        stage('Replace Env') {
            steps {
                script {
                    sh "cp $SECRET_FILE /var/jenkins_home/workspace/Bespo-Dev-FE/frontend/.env"
                }
            }
        }
        
        stage('Build frontend dev') {
            steps {
                dir('frontend') {
                    sh "npm install --legacy-peer-deps"
                    sh "CI=false npm run build"
                }
            }
        }
        
        stage('Building our image') { 
            steps { 
                dir('frontend') { 
                    script {
                        dockerImage = docker.build repository + ":$BUILD_NUMBER"
                    }
                }
            } 
        }
        stage('Login Dockerhub'){
            steps{
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        stage('Push') {
            steps {
                sh 'docker push $repository:$BUILD_NUMBER'
            }
        }
        stage('Pull') {
            steps {
                sh 'docker pull $repository:$BUILD_NUMBER'
            }
        }
        stage('stop prev container') {
            steps {
                sh 'docker stop dev-front || true'
                sh 'docker rm dev-front || true'
            }
        }
        stage('Run') {
            steps {
                sh 'docker run -d -p 3010:3010 --name dev-front $repository:$BUILD_NUMBER'
            }
        }
    }
    post {
        always {
            sh 'docker logout'
        }
    }
}
```
_________ 

<br><br><br>

## Project Environment Variable
### SpringBoot : application.properties
```

spring.application.name=bespo
server.port = 9090

spring.datasource.url=jdbc:mysql://{도메인명}/{스키마}
spring.datasource.username=
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

#JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.generate-ddl=true
spring.jpa.database=mysql

#JWT
jwt.secret-key = 


# KAKAO APPLICATION INFO
# REST_API KEY
oauth.kakao.client-id = 
# REDIRECT URL
oauth.kakao.url.auth = https://kauth.kakao.com
oauth.kakao.url.api = https://kapi.kakao.com

# S3
cloud.aws.credentials.accessKey=
cloud.aws.credentials.secretKey=
cloud.aws.s3.bucket=bespo
cloud.aws.region.static=ap-northeast-2
cloud.aws.stack.auto-=false
```
_________ 
### React : .env
```
REACT_APP_DOMAIN = "https://bespo.co.kr"
REACT_APP_BACKEND_URL = "https://bespo.co.kr/test/api"

REACT_APP_KAKAO_CLIENT_ID = ""

```
_________ 

<br><br><br>

```

