from flask import request, jsonify, session

from . import core
# from ../merger.models import User

# routes

# @app.route('/register', methods=['POST'])
# def register():
#     json_data = request.json
#     user = User(
#         email=json_data['email'],
#         password=json_data['password']
#     )
#     try:
#         db.session.add(user)
#         db.session.commit()
#         status = 'success'
#     except:
#         status = 'this user is already registered'
#     db.session.close()
#     return jsonify({'result': status})


# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     json_data = request.json
#     user = User.query.filter_by(email=json_data['email']).first()
#     if user and bcrypt.check_password_hash(
#             user.password, json_data['password']):
#         session['logged_in'] = True
#         status = True
#     else:
#         status = False
#     return jsonify({'result': status})

# @app.route('/status')
# def status():
#     if session.get('logged_in'):
#         if session['logged_in']:
#             return jsonify({'status': True})
#     else:
#         return jsonify({'status': False})

# @app.route('/logout', methods=['GET', 'POST'])
# def logout():
#     session.pop('logged_in', None)
#     return jsonify({'result': 'success'})
