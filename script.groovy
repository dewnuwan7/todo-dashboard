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
    withCredentials([usernamePassword(credentialsId: 'docker-hub', passwordVariable: 'PASS', usernameVariable: 'USER')]){
        sh "docker build -t dewnuwan/java-maven-app:jma-${params.VERSION} ."
        sh "echo $PASS | docker login -u $USER --password-stdin"
    }



}
def cleanupImage(){
    echo "Cleaning docker image from CI Server"
    sh "docker images"
}

return this