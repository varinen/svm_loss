import time
from fabric.contrib.files import exists
from fabric.api import cd, run

project_name = 'svm-demo'
REPO_URL = "git@github.com:varinen/svm_loss.git"
INSTALLATION_PATH = '/var/sites/' + project_name + '/'
release = time.time()
releases_dir = 'releases'


def deploy(dep_type='master', use_key=None):
    """
    :param dep_type: must be 'master', 'stage' or 'testing'. The repository must have
    respective branches
    :param use_key: specify optional path to the github key on the target machine, i.e., ~/.ssh/id_rsa
    :return:
    """
    print('Executing deploy for: ', dep_type)
    app_folder = f'{INSTALLATION_PATH}{dep_type}'
    cur_release_dir = app_folder + '/' + releases_dir + '/' + str(release)
    cur_front_dir = cur_release_dir + '/front'
    run(f'mkdir -p {cur_release_dir}')

    with cd(cur_release_dir):
        _git_clone(dep_type, use_key)
        print('Setting up the app')
        _setup_app()
        _run_tests()

    _create_symlink(cur_release_dir, app_folder, cur_front_dir)

    with cd(cur_front_dir):
        _set_up_front()
        _run_front_tests()
        _front_prod()

    _create_symlink(cur_release_dir, app_folder, cur_front_dir)

    with cd(app_folder + '/' + releases_dir):
        _remove_older_releases()


def _git_clone(branch, use_key):
    """ Clones the repo and switches to the specified branch
    :param branch:
    :return:
    """
    run('echo $PWD')
    if use_key is not None:
        run(
            f'ssh-agent bash -c \'ssh-add {use_key}; git clone {REPO_URL} . --quiet\'')
    else:
        run(f'git clone {REPO_URL} . --quiet')
    run(f'git checkout {branch} --quiet')
    run('touch .env')


def _setup_app():
    """ Runs the software installation and marks the installation as remote
    :return:
    """
    if not exists('venv/bin/pip'):
        run(f'python3.6 -m venv venv')
        # run(f'python3.6 -m venv venv --without-pip; curl https://bootstrap.pypa.io/get-pip.py | ./venv/bin/python')
    run('./venv/bin/pip install -r requirements.txt')


def _run_tests():
    """ Runs the unittests
    :return:
    """
    run(f'./venv/bin/python -m pytest tests')


def _create_symlink(cur_release_dir, app_folder, cur_front_dir):
    """ Creates a symlink to the current release location
    """
    print("about to create a symlink to the .env file")
    with cd(app_folder):
        link = app_folder + '/app'
        if exists(link):
            run(f'rm -rf {link}')
        run(f'ln -s {cur_release_dir} {link}')
    with cd(cur_front_dir):
        link = app_folder + '/app/front/.env'
        if exists(link):
            run(f'rm -rf {link}')
        print(f"creating a symlink to the .env file at {link}")
        run(f'ln -s {INSTALLATION_PATH}/local_config/.env {link}')


def _remove_older_releases():
    """
    Makes sure that the releases dir does not contain more than 2 latest
    release directories.
    Deletes all but the latest 2.
    Creates a new release dir
    :return:
    """
    print('Removing older releases')
    dirs = run(" ls -tr | tr '\n' ','")
    print(dirs)
    dirs = dirs.split(',')
    rev_dirs = dirs[::-1]
    print(' '.join(rev_dirs))
    to_delete = rev_dirs[4:]
    if len(to_delete) > 0:
        print("Removing older releases: ", ' '.join(to_delete))
    for delete_me in to_delete:
        run(f'rm -rf {delete_me}')


def _set_up_front():
    """ Runs the unittests
    :return:
    """
    run(f'npm i')

def _run_front_tests():
    """ Runs the unittests
    :return:
    """
    run(f'npm run test')

def _front_prod():
    """ Runs the unittests
    :return:
    """
    run(f'npm run build')

