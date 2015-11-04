import awsdb as db
from app import get_pollution_data
if __name__ == '__main__':
	try:
		cnx = db.connect();
		table1 = """test_table1"""
		param = [1, 2]
		rows = db.query(cnx, 
			"""SELECT * FROM {table} WHERE id = %s OR id=%s""".format(table=table1), 
			param
			)
		print rows
                get_pollution_data()
		param2 = [5]
		db.mutate(cnx,
			"""REPLACE INTO {table} (id) VALUES (%s) """.format(table=table1),
			param2
			)
	finally:
		db.close(cnx);
