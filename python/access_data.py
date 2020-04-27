#access_data.py: get data from database
#arg 1: path to folder containing database

import sqlite3
import json
import os
import constants
import sys

#query: SQL query
#args: list containing any arguments for SQL query
#query_type: 'SELECT' or 'UPDATE'
#conn: database connection
def execute_query(query, args, query_type, conn):
    cursor = conn.cursor()
    cursor.execute(query, args)

    if(query_type == 'UPDATE'):
        #need to commit so update is saved
        conn.commit()

    rows = cursor.fetchall()
    cursor.close()
    return rows

#tuple_row: tuple to turn into a dictionary
def tuple_to_dict(tuple_row):
    return dict(tuple_row)

#conn: database connection
def get_names(conn):

    rows = execute_query('SELECT * FROM names', [], 'SELECT', conn)
    rows_transformed = list(map(tuple_to_dict, rows))

    data_return = json.dumps(list(rows_transformed))
    return data_return

if __name__ == '__main__':
    print('access_data.py')
    db_path = sys.argv[1]
    conn = sqlite3.connect(db_path + '/' + constants.DB_NAME)
    conn.row_factory = sqlite3.Row

    data = get_names(conn)
    conn.close()
    print(data)
