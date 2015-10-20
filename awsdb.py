### A wrapper around MySQLdb 
### To start querying you need to open a connection 
###     cnx = db.connect()
### There are 2 types of queries: query (for queries that return stuff) and mutate (for queries that mutate tables and databases) 
### As soon as you finish querying call 
###     db.close(cnx) !!!! (IMPORTANT)

import MySQLdb

config = {
    'user': 'cleanair',
    'passwd': 'e8trig8t',
    'host': 'cleanair.cgajg8m2lzri.eu-west-1.rds.amazonaws.com',
    'port': 3306,
    'db': 'cleanair'
}

def connect():
    cnx = None
    try:
        cnx = MySQLdb.connect(**config)
        print 'Connected to the DB !'
        return cnx
    except Exception as err:
        print err
        cnx.close()

def close(cnx):
    try:
        cnx.close()
        print 'Connection closed !'
    except Exception as e:
        pass

def query(cnx, query, param=None):    
    try:
        result = []
        cursor = cnx.cursor()
        cursor.execute(query, param)
        for res in cursor.fetchall():
            result += res
        return result
    except Exception as e:
        #error
        print cursor._last_executed
        raise e

def mutate(cnx, query, param=None):
    try:
        cursor = cnx.cursor()
        cursor.execute(query, param)
        cnx.commit()
        return True
    except Exception as e:
        print cursor._last_executed
        raise e
        return False