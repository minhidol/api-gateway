import { loadPackageDefinition, ServerCredentials, Server } from "@grpc/grpc-js";
import { loadSync } from '@grpc/proto-loader'
import { ProtoGrpcType } from "./protobuf/log";
import { LogServiceHandlers } from "./protobuf/packagelogs/LogService";
import { logger } from "./logger/log";
const PROTO_PATH = "./src/protobuf/log.proto";


const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};
var packageDefinition = loadSync(PROTO_PATH, options);
const logProto = loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;

const server = new Server();

server.addService(logProto.packagelogs.LogService.service, {
    LogInfo: (req: any, callback: any) => {
        logger(req.request.topic, req.request.level).info(JSON.stringify(req.request))
        callback(null, req.request);
    },
    LogWarning: (req: any, callback: any) => {
        logger(req.request.topic, req.request.level).warn(JSON.stringify(req.request))
        callback(null, req.request);
    },
    LogError: (req: any, callback: any) => {
        logger(req.request.topic, req.request.level).error(JSON.stringify(req.request))
        callback(null, req.request);
    }
} as LogServiceHandlers);

server.bindAsync(
    "0.0.0.0:50051",
    ServerCredentials.createInsecure(),
    (error, port) => {
        console.log("Server running at http://0.0.0.0:50051");
        server.start();
    }
);