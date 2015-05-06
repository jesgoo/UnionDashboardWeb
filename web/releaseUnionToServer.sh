#!/bin/bash
ant -Dsite=union -Dsuffix=mini
scp outputmini/union/asset/union-index.js work@sh04.jesgoo.com:/home/work/UnionDashboard/web/web/output/union/asset/
exit 0
