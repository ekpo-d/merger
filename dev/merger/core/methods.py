import requests
from flask import request, jsonify, session, abort

from . import core, dropboxAPI, fileHandler
from .. import models

def getData(filepath):
    try:
        fileString = requests.get(dropboxAPI.download(filepath)).text
        return fileHandler.breakdown(fileString)
    except:
        abort(500)

@core.route('/upload', methods=['POST'])
def upload():
    files = request.files.to_dict()
    newfile = ''
    for item in files:
        newfile += files[item].read()
    dropboxAPI.upload(newfile, '/newfile.csv')
    return jsonify({'result': 'success'})

@core.route('/download/<fileType>', methods=['GET'])
def dl(fileType):
    filepath = '/' + fileType + '.csv'
    print filepath
    response = dropboxAPI.download(filepath)
    print response
    return jsonify({'result': 'success'})


@core.route('/get/<fileType>', methods=['GET'])
def getFile(fileType):
    filepath = '/' + fileType + '.csv'
    response = getData(filepath)
    return jsonify({'result': response})
