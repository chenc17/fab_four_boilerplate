#to_db.py: load data into a sqlite database
#arg1: path to folder containing JSON data file
#arg2: path to folder containing database

import sqlite3
import json
import os
import constants
import sys

#conn: database connection
#cur: database cursor
#data_folder_path: path to folder containing test data
def load_test_data(conn, cur, data_folder_path):
    cur.execute('''DROP TABLE IF EXISTS names''')
    cur.execute('''CREATE TABLE names (id integer, first_name text, last_name text)''')

    data_path = data_folder_path + '/' + constants.DATA_FILE_NAME

    if (os.path.isfile(data_path)):
        with open(data_path) as input_file:
            data = json.load(input_file)['names']

            for obj in data:
                print(obj)
                id = obj['id']
                first_name = obj['first_name']
                last_name = obj['last_name']

                cur.execute('INSERT INTO names VALUES (?, ?, ?)', [id, first_name, last_name])

            print('DATA LOADED.')
    else:
        print('\nNo such file: ', data_path)
        
    conn.commit()

#data_folder_path: path to folder containing test data
#db_path: path to folder containing database
def main(data_folder_path, db_path):

    conn  = sqlite3.connect(db_path + '/' + constants.DB_NAME)
    cur = conn.cursor()

    load_test_data(conn, cur, data_folder_path)

    conn.close()


if __name__ == "__main__":
    print('to_db.py')
    data_folder_path = sys.argv[1]
    db_path = sys.argv[2]
    main(data_folder_path, db_path)
