import dropbox
import requests

TOKEN = 'cfogSPbyLRAAAAAAAAAANi2N6aML0YbG7Z99XS-T8vbArW0UBQhqc4WODooPfzGW'

dbx = dropbox.Dropbox(TOKEN)
writeMode = dropbox.files.WriteMode('overwrite', None)

def upload(file_contents, path):
    dbx.files_upload(file_contents, path, writeMode)

def getLink(filePath):
    return dbx.files_get_temporary_link(filePath).link

def download(path):
    fileLink = getLink(path)
    try:
        fileString = requests.get(fileLink).text
    except:
        fileString = ''
    return fileString

    

