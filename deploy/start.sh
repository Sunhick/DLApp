#!/bin/sh

# 
# Author: Sunil <sunhick@gmail.com>
# Desc: Script for starting, stopping and restarting 
#        of server (nodejs, mongod and other services)
# Copyright (c) 2016. University of Colorado, boulder
#

let NODE_ENV=production
# export PATH = /usr/local/bin:$PATH

case "$1" in
    start)
            echo "Starting the nodejs start!"
            # Install the required NPM modules
            cd ../dlapp/ && npm install

            # Install the required bower components
            bower install

            # start the mongodb service
            # on Linux(ubuntu - AWS) it' can be started as a service.
            service mongod start
            # on mac 
            # mongod --dbpath ./db &

            # start the nodejs server
            forever start ../dlapp/bin/www > /dev/null
            ;;

   stop) 
          echo "Stopping the nodejs!"
           ;;

   restart)
            ;;

        *)
          echo "Usage: start.sh start|stop|restart"
          exit 1
          ;;
    esac