#!/bin/bash
export ANT_HOME=$ANT_HOME_1_8
export JAVA_HOME=$JAVA_HOME_1_6
export PATH=$JAVA_HOME/bin:$ANT_HOME/bin:$PATH

ant -Dsite=hj

exit 0
