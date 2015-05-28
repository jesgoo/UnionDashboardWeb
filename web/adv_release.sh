#!/bin/bash
ant -Dsite=adv -Dsuffix=mini
scp ./outputmini/adv.zip rundeck@192.168.2.5:/var/lib/rundeck/shangxian/adv_web
echo `date +%Y/%m/%d.%H:%M:%S`
exit 0
