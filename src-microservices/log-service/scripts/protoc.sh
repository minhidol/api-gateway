#!/bin/bash

yarn proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=./src/protobuf/ ./src/protobuf/log.proto