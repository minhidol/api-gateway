import { loadPackageDefinition, credentials } from "@grpc/grpc-js";
import { loadSync } from '@grpc/proto-loader'
import { ProtoGrpcType } from "@khoado24/log-library/protobuf/log";
import path from "path";
//import { ProtoGrpcType } from "../protobuf/log";
//const PROTO_PATH = "./src/protobuf/log.proto";

const packagepath = path.dirname(require.resolve(path.join('@khoado24/log-library', 'package.json')));
const PROTO_PATH = path.join(packagepath, 'protobuf/log.proto')

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = loadSync(PROTO_PATH, options);

const logService = loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType

const client = new logService.packagelogs.LogService(
  "localhost:50051",
  credentials.createInsecure()
);

export default client;