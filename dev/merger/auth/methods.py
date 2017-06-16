from flask import request, jsonify, session

from . import auth
from .. import models, db, bcrypt

# routes

@auth.route('/register', methods=['POST'])
def register():
    json_data = request.json
    user = models.User(
        email=json_data['email'],
        password=json_data['password']
    )
    try:
        db.session.add(user)
        db.session.commit()
        status = 'success'
    except:
        status = 'this user is already registered'
    db.session.close()
    return jsonify({'result': status})


@auth.route('/login', methods=['GET', 'POST'])
def login():
    json_data = request.json
    user = models.User.query.filter_by(email=json_data['email']).first()
    if user and bcrypt.check_password_hash(
            user.password, json_data['password']):
        session['logged_in'] = True
        status = True
    else:
        status = False
    return jsonify({'result': status})

@auth.route('/status', methods=['GET'])
def status():
    print session.get('logged_in')
    if session.get('logged_in'):
        if session['logged_in']:
            return jsonify({'status': True})
    else:
        return jsonify({'status': False})

@auth.route('/logout', methods=['GET', 'POST'])
def logout():
    session.pop('logged_in', None)
    return jsonify({'result': 'success'})
