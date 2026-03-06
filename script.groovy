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

}
def cleanupImage(){
    echo "Cleaning docker image from CI Server"
    sh "docker image"
}

return this