#!/bin/bash

for f in *.mp4; do
    ffmpeg -i "$f" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus "${f%.mp4}.webm"
done
