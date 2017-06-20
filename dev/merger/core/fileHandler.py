import pandas as pd
import sys, os, csv

from . import dropboxAPI

if sys.version_info[0] < 3: 
    from StringIO import StringIO
else:
    from io import StringIO


class ToolBox(object):
    def __init_(self):
        pass
    
    def breakdown(self, fileType, csvFile):
        if csvFile == '':
            return ''
        else:
            segment = csvFile.split('\n', 1)
            head = segment[0].split(';')
            body = []
            
            if segment[1].find('\n') !=  -1:
                for i in segment[1].split('\n'):
                    bodyParts = i.split(';')
                    body.append(bodyParts)
            else:
                body.append(segment[1].split(';'))

            return {
                "head" : head,
                "body" : body
            }

    def getHeading(self, separator, csvFile):
        if csvFile == '':
            return ''
        else:
            segment = csvFile.split('\n', 1)
            heading = segment[0].split(separator)
            return heading
            
    def generateBody(self, fileString):
        if fileString == '':
            return ''
        else:
            segment = fileString.split('\n')
            body = []
            if len(segment) > 1:
                for i in segment:
                    bodyParts = i.split(';')
                    body.append(bodyParts)
            else:
                body.append(body[0].split(';'))

        return body

    def createFileContents(self, name, df):
        path = 'temp/' + name + '.csv'
        df.to_csv(path, index=False, sep=";", na_rep="N/A")
        with open(path, 'rw') as csvFile:
            content = csvFile.read()
        return content

    def createDF(self, separator, column, fileString):
        newfileData = StringIO(fileString)
        df = pd.read_csv(newfileData, sep=separator)
        df[column] = df.business_name.map(lambda x : x.strip())
        return df

    def createFile(self, files):
        newfile = ''
        for item in files:
            newfile += files[item].read()
        return newfile

    def generateDuplicateDict(self, fileString):
        heading = self.getHeading(';', fileString)
        firstColumn = heading[0]
        df = self.createDF(';', firstColumn, fileString)
        dups = df[df.duplicated([firstColumn],  keep=False)]
        
        dupDictionary = {i:dups[dups[firstColumn]==i].values.tolist() for i in dups[firstColumn].unique() }

        for item in dupDictionary:
            item = str(item)
            dupDictionary[item] = [map(str, elem) for elem in dupDictionary[item]]

        dupDict2 = {
            "body" : dupDictionary,
            "head" : heading
        }

        return dupDict2


class Base(ToolBox):

    def __init__(self, files):
        self.files = files

        self.newfile = super(Base, self).createFile(self.files)

        self.firstColumn = super(Base, self).getHeading(',', self.newfile)[0]

        self.df = super(Base, self).createDF(',', self.firstColumn, self.newfile)


    def duplicates(self):
        dupDF = pd.concat(g for _, g in self.df.groupby(self.firstColumn) if len(g) > 1)

        return super(Base, self).createFileContents('duplicates', dupDF)


    def merged(self):
        mergedDF = self.df[~self.df.duplicated([self.firstColumn],  keep=False)] 

        return super(Base, self).createFileContents('merged', mergedDF)