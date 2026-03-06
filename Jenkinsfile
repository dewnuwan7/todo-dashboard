def gv

pipeline{

agent any

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