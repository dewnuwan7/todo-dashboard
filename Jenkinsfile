def gv

pipeline{
agent any

parameters {
    string(name: 'VERSION', defaultValue: '', description: 'Build Version')
}
stages{
    stage("init"){
        steps{
            script{
                gv = load "script.groovy"
            }
        }
    }

    stage("build"){
        steps{
            script{
                gv.buildNode()
            }
        }
    }

    stage("docker-build"){
            steps{
                script{
                    gv.buildDocker()
                }
            }
        }

    stage("deploy"){
        steps{
            script{
                gv.pushDocker()
            }
        }
    }
    stage("cleanup"){
            steps{
                script{
                    gv.cleanupImage()
                }
            }
        }
    }

}