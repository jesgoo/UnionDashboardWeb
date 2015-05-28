#!/bin/bash
ant -Dsite=union -Dsuffix=mini
./releaseToServer
echo `date +%Y/%m/%d.%H:%M:%S`
exit 0
