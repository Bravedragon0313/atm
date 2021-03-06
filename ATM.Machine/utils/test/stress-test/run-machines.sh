#!/bin/bash

run_machine(){
  ../bin/atm_base-machine --mockBillValidator --mockBillDispenser --mockCam --dataPath ./stress-test/machines/$1
}

for d in machines/*/; do
  run_machine "${d//[!0-9]/}" &
done
