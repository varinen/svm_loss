# SVM-Style Loss Function Demo

This projects implements the visualization of optimization loss for a linear 
multiclass classifier using Python and Flask. The idea is based on the 
Multiclass Linear Classification Optimization Loss Visualization [web demo by Justin Johnson](http://vision.stanford.edu/teaching/cs231n-demos/linear-classify/).

The live version is available here:
[SVM-Style Loss Function Demo](https://svm-demo.singularaspect.com/)

### Prerequisites

* Python 3.6
* virtualenv + pip
* Git
* Packages listed in the `requirements.txt`

### Installing on the local system

* Clone this repository.
 * Create a virtual environment under `venv` folder within
the project root and activate it. Optionally, run `pip install --upgrade pip`.
 * In the activated virtual environment, run `pip install -r requirements.txt`
 * Run the test suite to make sure everything works: `python -m pytest tests`


## Running the tests

In the project root, execute:

    python -m pytest tests

## Deployment

The following assumes using of a Ubuntu server with privileges to configure
an Nginx web server.

#### Prerequisites

 * Git
 * Python3.6 (`python3.6 python3.6-venv`)
 * Nginx
 * Gunicorn

#### Preparing the file system

The file system location of the future app will be within `/var/sites/` directory. 
In that location, the project will be deployed into:

    drwxrwxr-x  3 ownername ownergroup 4096 Aug 19 18:02 svm-demo/
    
The folder structure will look like this:

    var/
	    sites/
		    svm-demo/
			    master/
				    app ->  /var/sites/svm-demo/master/releases/1566286138.888088/
				    releases/
					    1566210232.5667802/
					    1566230574.4630783/
					    1566286138.888088/

Note that `master` and its subdirectories refer to a _production_ deploy with 
code pulled from the `master` branch. If you choose to do a `stage` or a `test` deploy,
make sure the repository has a branch with the respective name and you use the
appropriate value for the `dep_type` argument in the deployment command (see below).
In a case of a non-production deployment, the target directory will be automatically created
under a different name (`stage` or `test`).

#### Setting Up Nginx

Create a new file under `/etc/nginx/sites-available/svm-demo` with the following content: 

    server {
        listen 80;
        server_name svm-demo.yoursitename.com;
     
        location /static {
            alias /var/sites/svm-demo/master/app/app/static;
        }
     
        location / {
            proxy_pass http://unix:/tmp/svm-demo.yoursitename.com.socket;
            proxy_set_header Host $host;
        }
    }

The website code will be served via a socket that will be created by a service 
that runs Gunicorn for the website. The static files are delivered directly by Nginx.

After the file is created, add a symlink to it under `/etc/nginx/sites-enabled`:

    sudo ln -s  /etc/nginx/sites-available/svm-demo /etc/nginx/sites-enabled/svm-demo
    
Test the configuration by running:

    sudo nginx -c /etc/nginx/nginx.conf -t

Finally, reload the service

    sudo systemctl reload nginx
    
#### Setting Up Gunicorn

Gunicorn will run as a service bound to a socket. Under `/etc/systemd/system`, 
create a file `gunicorn-svm-demo.service` with the following content:        
   
    [Unit]
    Description=Gunicorn server for the demo app for the DOMAIN, USERNAME
     
    [Service]
    Restart=on-failure
     
    User=USERNAME
    WorkingDirectory=/var/sites/svm-demo/master/app/
    EnvironmentFile=/var/sites/svm-demo/master/app/.env
    ExecStart=/var/sites/svm-demo/master/app/venv/bin/gunicorn --bind \ unix:/tmp/DOMAIN.socket wsgi:app
     
    [Install]
    WantedBy=multi-user.target


Replace DOMAIN with svm-demo.yoursitename.com and USERNAME with the user that you are
going to run the service under. It is the same user that runs the deploy script.   

To enable this configuration run:

    sudo systemctl daemon-reload
    sudo systemctl enable gunicorn-svm-demo.service
    sudo systemctl start gunicorn-svm-demo.service     
    
Check the status of the service by running:

    sudo systemctl status gunicorn-svm-demo.service
    
If something goes wrong, check either the Nginx log or the service log by running:

    sudo journalctl -u gunicorn-svm-demo.service

#### Deploying to the Remote Server

While in the local installation's project root, change into the 
directory `deploy_tools`. There, execute this command:

    fab deploy:host=USERNAME@HOSTNAME,dep_type=TYPE -i /PATH_TO_PRIVATE_KEY
    
The variable TYPE indicates what installation type is: `master` 
(live production), `stage`, or `test`. The installation folder takes the value of type.

## Authors

* **Oleg Ishenko** - *Initial work* - [Varinen](https://github.com/varinen)

## License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* [SVM Loss web demo by Justin Johnson](http://vision.stanford.edu/teaching/cs231n-demos/linear-classify/).
