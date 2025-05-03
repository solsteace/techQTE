import os
from datetime import datetime

SECONDS_IN_MONTH = 60 * 60 * 24 * 30

# Refs: 
# https://docs.python.org/3/library/os.html#os.scandir
# https://docs.python.org/3/library/os.html#os.DirEntry
if __name__ == "__main__":
    target_dir = os.path.join(".", ".")
    csv_files = filter(lambda x: x.is_file() and x.name.endswith(".csv"), \
                        os.scandir(target_dir))
    current_time = datetime.now().timestamp()

    # If used on Windows platform, adjust based on: https://docs.python.org/3/library/os.html#os.stat_result
    for cf in csv_files:
        age = current_time - cf.stat().st_ctime
        if age > SECONDS_IN_MONTH:
            try:
                os.remove(cf.path)
                print(f"INFO: `{cf.name}` has been deleted")
            except FileNotFoundError:
                print(f"WARNING: Failed to remove `{cf.name}` as it may have already deleted")
            except Exception as e:
                print("DANGER: Unidentified error happened")
                print(e)