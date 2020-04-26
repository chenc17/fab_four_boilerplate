import sqlite3
import json
import os
import constants
import sys

def load_test_data(conn, cur, data_folder_path):
    cur.execute('''DROP TABLE IF EXISTS names''')
    cur.execute('''CREATE TABLE names (id integer, first_name text, last_name text)''')

    path = data_folder_path + '/' + constants.DATA_FILE_NAME

    if (os.path.isfile(path)):
        with open(path) as input_file:
            data = json.load(input_file)['names']

            for obj in data:
                print(obj)
                id = obj['id']
                first_name = obj['first_name']
                last_name = obj['last_name']

                cur.execute('INSERT INTO names VALUES (?, ?, ?)', [id, first_name, last_name])

            print('DATA LOADED.')
    else:
        print('\nNo such file: ', path)
    conn.commit()

def main(data_folder_path, db_path):

    conn  = sqlite3.connect(db_path + '/' + constants.DB_NAME)
    cur = conn.cursor()

    #try/catch around each?
    load_test_data(conn, cur, data_folder_path)

    conn.close()


if __name__ == "__main__":
    #TODO hardening
    print('to_db.py')
    data_folder_path = sys.argv[1]
    db_path = sys.argv[2]
    main(data_folder_path, db_path)
