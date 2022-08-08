import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { LogServiceClient as _packagelogs_LogServiceClient, LogServiceDefinition as _packagelogs_LogServiceDefinition } from './packagelogs/LogService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  google: {
    protobuf: {
      Empty: MessageTypeDefinition
    }
  }
  packagelogs: {
    Log: MessageTypeDefinition
    LogService: SubtypeConstructor<typeof grpc.Client, _packagelogs_LogServiceClient> & { service: _packagelogs_LogServiceDefinition }
  }
}

