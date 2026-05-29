pipeline {
    agent ubuntu

    tools {
        nodejs 'Node js 26'
    }

    stages {
        stage("Install dependices") {
            steps {
                sh "npm ci"
            }
        }

        stage("Testing") {
            steps {
                echo "Testing project"
            }
        }

        stage("Zip the build") {
            steps {
                zip(zipFile: 'proj.zip', dir: '.' archive: true, exclude: 'node_modules/**')
            }
        }

        stage("Send the AEB") {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding', 
                    credentialsId: 'AWS_USER_CRED'
                ]]) {
                    sh 'aws s3 cp proj.zip s3://elasticbeanstalk-us-east-1-672296384062/proj.zip'
                    sh 'aws elasticbeanstalk create-application-version \
                        --application-name "bla" \
                        --version-label "$BUILD_ID-update" \
                        --source-bundle S3Bucket="elasticbeanstalk-us-east-1-672296384062",S3Key="proj.zip" \
                        --description "Jenkins pipeline update" \
                        --process'

                    sh 'aws elasticbeanstalk update-environment \
                    --environment-name "Bla-env" \
                    --version-label "$BUILD_ID-update"'
                }
            }
        }

    }
    
}