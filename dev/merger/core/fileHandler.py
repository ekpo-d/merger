def breakdown(csvFile):
    segment = csvFile.split('\n', 1)
    head = segment[0].split(',')
    body = []

    if segment[1].find('\n') !=  -1:
        for i in segment[1].split('\n'):
            bodyParts = i.split(',')
            body.append(bodyParts)
    else:
        body.append(segment[1].split(','))

    return {
        "head" : head,
        "body" : body
    }
