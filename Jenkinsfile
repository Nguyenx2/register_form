pipeline {
    agent any

    tools {
        'allure' 'allure-commandline'
    }

    stages {
        stage('Test Execution') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.57.0-jammy'
                    args '--ipc=host --user root'
                }
            }
            steps {
                checkout scm

                cache(maxCacheSize: 500, caches: [
                    arbitraryFileCache(path: '/root/.npm', cacheValidityDecidingFile: 'package-lock.json')
                ]) {
                    script {
                        sh "npm ci --prefer-offline"
                    }
                }

                script {
                    def grepParam = ""

                    if (env.CHANGE_ID) {
                        echo "------ Phat hien Pull Request #${env.CHANGE_ID} ------"
                        echo "------ Che do: Smoke Test ------"

                        grepParam = "--grep '@smoke'"
                    } else {
                        if (params.GREP_TAG != "") {
                            grepParam = "--grep '${params.GREP_TAG}'"
                        }
                    }

                    catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                        sh "TARGET_ENV=${params.TARGET_ENV ?: 'staging'} npx playwright test ${grepParam}"
                    }
                }
            }
        }

        stage('Report Generation') {
            steps {
                allure([
                    includeProperties: false,
                    jdk: '',
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }

    post {
        always {
            discordSend (
                description: "Job **${env.JOB_NAME}** finished.",
                footer: "Jenkins Smart Bot",
                link: env.BUILD_URL + "allure/",
                result: currentBuild.currentResult,
                title: "Build #${env.BUILD_NUMBER} Result",
                webhookURL: 'https://discord.com/api/webhooks/1458407808847450196/sSpkT3an2b3j6zJ68gJmY2MbrGRGKyD6nnSi3pslVuZEW2Ay2nrFwH5IuS1wLJPhFl_E'
            )
        }
    }
}