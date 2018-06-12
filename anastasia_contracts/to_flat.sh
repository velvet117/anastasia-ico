#!/usr/bin/env bash

rm -rf flats/*
./node_modules/.bin/truffle-flattener contracts/AnastasiaToken.sol > flats/AnastasiaToken_flat.sol
./node_modules/.bin/truffle-flattener contracts/AnastasiaICO.sol > flats/AnastasiaICO_flat.sol