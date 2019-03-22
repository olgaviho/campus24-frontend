#!/bin/sh
npm run build
rm -rf ../../campus24-backend/campus24/build
cp -r build ../../campus24-backend/campus24/