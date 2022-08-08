// Original file: protobuf/log.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Log as _packagelogs_Log, Log__Output as _packagelogs_Log__Output } from '../packagelogs/Log';

export interface LogServiceClient extends grpc.Client {
  LogError(argument: _packagelogs_Log, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  LogError(argument: _packagelogs_Log, metadata: grpc.Metadata, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  LogError(argument: _packagelogs_Log, options: grpc.CallOptions, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  LogError(argument: _packagelogs_Log, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  logError(argument: _packagelogs_Log, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  logError(argument: _packagelogs_Log, metadata: grpc.Metadata, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  logError(argument: _packagelogs_Log, options: grpc.CallOptions, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  logError(argument: _packagelogs_Log, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  
  LogInfo(argument: _packagelogs_Log, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  LogInfo(argument: _packagelogs_Log, metadata: grpc.Metadata, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  LogInfo(argument: _packagelogs_Log, options: grpc.CallOptions, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  LogInfo(argument: _packagelogs_Log, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  logInfo(argument: _packagelogs_Log, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  logInfo(argument: _packagelogs_Log, metadata: grpc.Metadata, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  logInfo(argument: _packagelogs_Log, options: grpc.CallOptions, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  logInfo(argument: _packagelogs_Log, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  
  LogWarning(argument: _packagelogs_Log, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  LogWarning(argument: _packagelogs_Log, metadata: grpc.Metadata, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  LogWarning(argument: _packagelogs_Log, options: grpc.CallOptions, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  LogWarning(argument: _packagelogs_Log, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  logWarning(argument: _packagelogs_Log, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  logWarning(argument: _packagelogs_Log, metadata: grpc.Metadata, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  logWarning(argument: _packagelogs_Log, options: grpc.CallOptions, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  logWarning(argument: _packagelogs_Log, callback: grpc.requestCallback<_packagelogs_Log__Output>): grpc.ClientUnaryCall;
  
}

export interface LogServiceHandlers extends grpc.UntypedServiceImplementation {
  LogError: grpc.handleUnaryCall<_packagelogs_Log__Output, _packagelogs_Log>;
  
  LogInfo: grpc.handleUnaryCall<_packagelogs_Log__Output, _packagelogs_Log>;
  
  LogWarning: grpc.handleUnaryCall<_packagelogs_Log__Output, _packagelogs_Log>;
  
}

export interface LogServiceDefinition extends grpc.ServiceDefinition {
  LogError: MethodDefinition<_packagelogs_Log, _packagelogs_Log, _packagelogs_Log__Output, _packagelogs_Log__Output>
  LogInfo: MethodDefinition<_packagelogs_Log, _packagelogs_Log, _packagelogs_Log__Output, _packagelogs_Log__Output>
  LogWarning: MethodDefinition<_packagelogs_Log, _packagelogs_Log, _packagelogs_Log__Output, _packagelogs_Log__Output>
}
