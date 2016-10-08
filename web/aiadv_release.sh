#!/bin/bash
ant -Dsite=adv -Dsuffix=mini
scp ./outputmini/adv.zip rundeck@run.jesgoo.com:/var/lib/rundeck/shangxian/adv_web/
echo `date +%Y/%m/%d.%H:%M:%S`
exit 0
