#!/bin/bash
ant -Dsite=lunion -Dsuffix=mini
scp ./outputmini/lunion.zip rundeck@run.jesgoo.com:/var/lib/rundeck/shangxian/union_web
echo `date +%Y/%m/%d.%H:%M:%S`
exit 0
