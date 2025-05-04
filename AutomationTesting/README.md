# Automation with Cronjob

## Table of Contents

- [About](#about)
- [Technicals](#technicals)
    - [Setup](#setup)
    - [Extension](#extension)

## About

Tired of doing laborish and repetitive tasks over and over? Enter Cron, a tool to help you automate your tasks! Here we would see a demonstration on automating data collection and also monitoring our collection to clean the old ones.

## Technicals

### Setup

> Make sure your machine has the following things installed:
> - Cron
> - Python 3
>   - `requests` (install with `pip install requests`)
> - Bash

Follow through these steps:

1. Make sure you are connected to your datasource, for example via the Internet.

2. Ensure the scripts (in this example, Python scripts) already has `x` permission bit so that it could be executed. A simple way (although may not be the best) to do it is by giving the execution permission (`x` bit) to everyone by:
   
   ```
   chmod 777 /path/to/collect.py
   chmod 777 /path/to/clean.py
   ```

4. If needed, adjust the cronjob content to your need. You could also adjust the command trigger time. In this example, I would like to save the collected data and monitor them in `/home/cron`. 

    > You may need to enter Python's full path if your machine doesn't recognize it simply by its name

    ```
    0 8,12,15 * * * python /path/to/collect.py /home/cron
    * * * * * python /path/to/clean.py /home/cron
    ```


5. Add the cronjobs to your crontab entry. If you need a higher privilege for doing your cronjob, you could consider putting `sudo` at the beginning. Continuing from previous example, enter:

    ```
    sudo crontab -e
    ```

### Extension

This example could be extended to chain more tasks too! For example, we could print the message on our script and redirect them into a log file. Put more info, such as the timestamp and summary, and it would become a more powerful tool for you to understand what's going on with the automation!
