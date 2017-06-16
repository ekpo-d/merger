import dropbox

TOKEN = 'cfogSPbyLRAAAAAAAAAANi2N6aML0YbG7Z99XS-T8vbArW0UBQhqc4WODooPfzGW'

dbx = dropbox.Dropbox(TOKEN)
writeMode = dropbox.files.WriteMode('overwrite', None)

def upload(file_contents, path):
    dbx.files_upload(file_contents, path, writeMode)

def download(path):
    return dbx.files_get_temporary_link(path).link


    

