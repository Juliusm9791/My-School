#!/bin/bash
docker kill mongo
docker rm mongo
docker run --name mongo -it -d -v  /System/Volumes/Data/data/db:/data/db -p 27017:27017 mongo
