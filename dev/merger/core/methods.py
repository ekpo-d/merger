import requests
from flask import request, jsonify, session, abort, session

from . import core, dropboxAPI, fileHandler
from .. import models



def getFile(fileType, filePath):
    toolBox = fileHandler.ToolBox()
    try:
        fileString = dropboxAPI.download(filePath)
        if fileType == 'merged':
            return toolBox.breakdown(fileType, fileString)
        elif fileType == 'conflicts':
            response = toolBox.generateDuplicateDict(fileString)
            return response
        elif fileType == 'logs':
            response = toolBox.generateBody(fileString)
            return response
    except:
        abort(500)

@core.route('/upload', methods=['POST'])
def upload():
    files = request.files.to_dict()
    handle = fileHandler.Base(files)

    conflicts = handle.duplicates()
    mergedFiles = handle.merged()
    dropboxAPI.upload(conflicts, '/conflicts.csv')
    dropboxAPI.upload(mergedFiles, '/merged.csv')
    return jsonify({'result': 'success'})


@core.route('/updatefile', methods=['POST'])
def update():
    row = request.json
    mList = row['data'].split(';')
    merged = dropboxAPI.download('/merged.csv')
    logs = dropboxAPI.download('/logs.csv')
    logString = session['user'] + ';' + mList[0] + '\n'
    mergedString = merged + row['data'] + '\n'
    dropboxAPI.upload(mergedString.encode('utf-8'), '/merged.csv')
    dropboxAPI.upload(logString.encode('utf-8'), '/logs.csv')
    return jsonify({'result': 'upload successful'})

@core.route('/download/<fileType>', methods=['GET'])
def download(fileType):
    filepath = '/' + fileType + '.csv'
    response = dropboxAPI.getLink(filepath)
    return jsonify({'result': response})


@core.route('/get/<fileType>', methods=['GET'])
def getData(fileType):
    filePath = '/' + fileType + '.csv'
    response = getFile(fileType, filePath)
    return jsonify({'result': response})
