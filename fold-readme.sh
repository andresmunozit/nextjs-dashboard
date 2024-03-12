#!/bin/bash
mv README.md README_old.md

# -s = fold spaces
# -w = fold max width
fold -s -w 100 README_old.md > README.md
rm README_old.md
