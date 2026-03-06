def buildNode(){
    echo 'installing Node modules..'
    sh 'npm install'
}

def buildDocker(){
    echo 'Building Docker Image..'
    sh "docker build -t dewnuwan/todo-dashboard-${params.VERSION} ."

}

def pushDocker(){
    echo "Deploying Docker Image.."
    withCredentials([usernamePassword(credentialId: 'docker-hub', passwordVariable: 'PASS', usernameVariable: 'USER')]){
        sh "echo $PASS | docker login -u $USER --password-stdin"
        echo "logged in succesfully"
    }




}
def cleanupImage(){
    echo "Cleaning docker image from CI Server"
    sh "docker image"
}

return this