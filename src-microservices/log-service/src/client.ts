import { loadPackageDefinition, credentials } from "@grpc/grpc-js";
import { loadSync } from '@grpc/proto-loader'
import { ProtoGrpcType } from "./protobuf/log";
const PROTO_PATH = "./protobuf/log.proto";

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
  "grpc-server:50051",
  credentials.createInsecure()
);

export default client;