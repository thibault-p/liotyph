from flask import Flask, render_template, abort, request, jsonify, g, url_for, make_response
from flask.ext.httpauth import HTTPBasicAuth
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)

## liotyph imports
from liotyphserver.database import db_session
from liotyphserver.model import User
from liotyphserver import app



auth = HTTPBasicAuth()


@auth.verify_password
def verify_password(username_or_token, password):
    user = User.verify_auth_token(username_or_token)
    if not user:
        user = User.query.filter_by(name = username_or_token).first()
        if not user or not user.verify_password(password):
            return False
    g.user = user
    return True

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/mock')
def mock():
    return render_template('mocklogin.html')

@auth.error_handler
def unauthorized():
    return make_response(jsonify({'error': 'unauthorized access'}), 401)

################ API V1 #################
@app.route('/api/token', methods=['POST'])
@auth.login_required
def get_auth_token():
    token = g.user.generate_auth_token(600)
    return jsonify({'token': token.decode('ascii'), 'duration': 600})

@app.route('/api/')
@app.route('/api/albums', methods=['GET'])
@auth.login_required
def getAlbums():
    return jsonify({'albums': []})

@app.route('/api/album/<int:year>/<int:month>', methods=['GET'])
@auth.login_required
def getAlbum(year, month):
    return jsonify({'year': year, 'month': month})
