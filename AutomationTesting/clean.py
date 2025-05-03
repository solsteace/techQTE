import sys
import os
from datetime import datetime

SECONDS_IN_MONTH = 60 * 60 * 24 * 30

# Refs: 
# https://docs.python.org/3/library/os.html#os.scandir
# https://docs.python.org/3/library/os.html#os.DirEntry
if __name__ == "__main__":
    if sys.argv[1] == "-h":
        print("\n".join([
            "CSV Cleaner ===========",
            "Checks a directory and removes .csv files after it being existed for a month",
            "Args: [-h | <path>]",
            "",
            "-h\t: Displays this manual",
            "<path>\t: Path of the directory to monitor. If omitted, current directory will be used instead."
        ]))
        sys.exit(0)

    target_dir = os.path.join(".", ".") if len(sys.argv) == 1 else sys.argv[1]
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