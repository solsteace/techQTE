import sys
import csv
import os
from datetime import datetime
import requests


if __name__ == "__main__":
    collection_date, collection_hour = \
        datetime.now()\
            .strftime("%Y-%m-%d %H-%M-%S")\
            .split(" ")

    ok = False
    try:
        response = requests.get("https://jsonplaceholder.typicode.com/comments")
        ok = response.status_code == 200
    except requests.exceptions.ConnectionError:
        print("Device is not connected to the internet")
    except Exception as e:
        print("Unidentified error happened: ", e)
 
    if not(ok):
        sys.exit(-1)

    rows = response.json()
    row_header = rows[0].keys() if len(rows) > 0 else []


    write_dir = os.path.join(".", ".")
    write_path = os.path.join(write_dir, f"cron_{collection_date}_{collection_hour}.csv")
    with open(write_path, "w") as f:
        writer = csv.writer(f)
        writer.writerow(row_header)

        row_values = []
        for idx in range(len(rows)):
            row_data = []
            for field in rows[idx].keys():
                if field != "body":
                    row_data.append(rows[idx][field])
            row_data.append(repr(rows[idx]["body"])) # Let's treat the metacharacters as is ("\n" could break the csv file in its "rendered form")
            row_values.append(row_data)
            
        writer.writerows(row_values)
