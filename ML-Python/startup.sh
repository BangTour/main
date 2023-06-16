#! /bin/bash

sudo apt update
sudo apt upgrade -y
sudo apt install -y python3-pip nginx-full python3-dev python3-venv build-essential libssl-dev libffi-dev python3-setuptools git bzip2 libxml2-dev libsm6 libxrender1 libfontconfig1
pip install flask gunicorn wheel

git clone https://github.com/BangTour/main.git
cd main
git checkout cc

cd ML-Python/
python3 -m venv base
source base/bin/activate

pip install -r requirements.txt

sudo /etc/init.d/nginx start
sudo rm /etc/nginx/sites-enabled/default
sudo touch /etc/nginx/sites-available/base
sudo ln -s /etc/nginx/sites-available/base /etc/nginx/sites-enabled/base

sudo tee /etc/nginx/sites-enabled/base << EOF
server {
    location / {
        proxy_pass http://0.0.0.0:8080;
    }
}
EOF

sudo /etc/init.d/nginx restart

cd /home/c169dsx2860/main/ML-Python/
gunicorn --bind 0.0.0.0:8080 main:app --daemon






