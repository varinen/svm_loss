Provisioning a new installation
===============================

## Required packages

* Python 3.6
* virtualenv + pip
* Git
* Fabric 3

 
eg, on Ubuntu:

    sudo add-apt-repository ppa:deadsnakes/ppa
    sudo apt update
    sudo apt install git python3.6 python3.6-venv
    
## Fabric deploy

When deploying through fabric, change into the directory `deploy_tools`, there execute

    fab deploy:host=USERNAME@HOSTNAME,dep_type=TYPE -i /PATH_TO_PRIVATE_KEY
    
The variable TYPE indicates what installation type is: master(live production), stage, or test.
The installation folder takes the value of type.

The application will be installed under `/var/sites/svm-demo`

Make sure that the target folder `/var/python` is writeable to the user you indicate in the `fab deploy` command.

## Local Config

Production deploy uses environment variables that are symlinked from the folder on the target server at `/var/sites/svm-demo/local_config`.

Place a `.env` file there and provide a value for the `API_URL` variable. Example content:

    CI=true
    NODE_ENV=production
    API_URL=https://svm-demo.singularaspect.com


