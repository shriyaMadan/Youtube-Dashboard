to fix port busy on linux:

find the process at that port --> `fuser -n tcp -k <portNum>`
kill the process --> `kill <processid>`
