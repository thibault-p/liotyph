from flask import Flask
app = Flask(__name__)


############### Load config #################
app.config['SECRET_KEY'] = "hello world"
app.config['DATABASE_FILE'] = "/tmp/database.db"
app.config['TMP_PICTURE_FOLDER'] = "/tmp/liotyphserver_tmp/"

app.config['SECURITY_PASSWORD_HASH'] = 'sha512_crypt'
app.config['SECURITY_PASSWORD_SALT'] = 'fhasdgihwntlgy8f'


import liotyphserver.model
import liotyphserver.views
