// import { Kafka } from "kafkajs"

// const { logLevel } = require('kafkajs')
// const winston = require('winston')
// const toWinstonLogLevel = (level: any) => {
//     switch (level) {
//         case logLevel.ERROR:
//         case logLevel.NOTHING:
//             return 'error'
//         case logLevel.WARN:
//             return 'warn'
//         case logLevel.INFO:
//             return 'info'
//         case logLevel.DEBUG:
//             return 'debug'
//     }
// }

// const WinstonLogCreator = (level: any) => {
//     const logger = winston.createLogger({
//         level: toWinstonLogLevel(level),
//         // transports: [
//         //     new winston.transports.Console(),
//         //     new winston.transports.File({ filename: 'myapp.log' })
//         // ]
//     })

//     return ({ namespace, level, label, log }: any) => {
//         const { message, ...extra } = log
//         logger.log({
//             level: toWinstonLogLevel(level),
//             message,
//             extra,
//         })
//     }
// }

// const kafka = new Kafka({
//     clientId: 'product-service',
//     brokers: ['kafkaserver:9092'],
//     logLevel: logLevel.ERROR,
//     logCreator: WinstonLogCreator
// })

import { createLogger } from 'winston';

const a = require('winston')
require('winston-kafka-stream');

//import { } from 'winston-kafka-stream'

export const logger = (topic: any, level: any) => createLogger({
    level: 'info',
    transports: [
        new a.transports.KafkaStream({
            kafkaHost: 'kafkaserver:9092',
            producer: {
                topic: topic
            }
        }),
    ]
});