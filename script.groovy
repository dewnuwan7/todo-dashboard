def buildNode(){
    echo 'installing Node modules..'
    sh 'npm install'
}

def buildDocker(){
    echo 'Building Docker Image..'
    sh "docker build -t todo-dashboard-${params.VERSION} ."

}

def pushDocker(){
    echo "Deploying Docker Image.."
    withCredentials([usernamePassword(credentialsId: 'docker-hub', passwordVariable: 'PASS', usernameVariable: 'USER')]){
        sh "echo $PASS | docker login -u $USER --password-stdin"
    }



}
def cleanupImage(){
    echo "Cleaning docker image from CI Server"
    sh "docker images"
    sh "docker rmi todo-dashboard-${params.VERSION}"
    sh "docker images"

}

return this