#!/bin/bash
ant -Dsite=aiadv -Dsuffix=mini
scp ./outputmini/aiadv.zip rundeck@run.jesgoo.com:/var/lib/rundeck/shangxian/adv_web/
echo `date +%Y/%m/%d.%H:%M:%S`
exit 0
