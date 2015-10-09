from flask import Flask, render_template, jsonify, make_response
from flask.ext.httpauth import HTTPBasicAuth
auth = HTTPBasicAuth()

app = Flask(__name__)





@app.route('/')
def index():
    return render_template('index.html')



@auth.get_password
def get_password(username):
    if username == 'admin':
        return 'root'
    return None

@auth.error_handler
def unauthorized():
    return make_response(jsonify({'error': 'unauthorized access',}), 401)


@app.route('/api/v1/albums', methods=['GET'])
@auth.login_required
def getAlbums():
    return jsonify({'albums': []})

@app.route('/api/v1/album/<int:year>/<int:month>', methods=['GET'])
@auth.login_required
def getAlbum(year, month):
    return jsonify({'year': year, 'month': month})



if __name__ == '__main__':
    app.run(debug=True)
