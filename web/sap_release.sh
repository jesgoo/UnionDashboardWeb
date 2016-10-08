#!/bin/bash
ant -Dsite=union -Dsuffix=mini
scp ./outputmini/union.zip rundeck@run.jesgoo.com:/var/lib/rundeck/shangxian/union_web
echo `date +%Y/%m/%d.%H:%M:%S`
exit 0
