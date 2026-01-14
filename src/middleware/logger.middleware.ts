import pino from 'pino';
import pinoHttp, { Options as PinoHttpOptions } from 'pino-http';
import { Request, Response } from 'express';
import { IncomingMessage, ServerResponse } from 'http';

export const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport:
    process.env.NODE_ENV === 'production'
      ? undefined
      : {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
});

// Short, concise request logger
export const requestShortLogger = pinoHttp({
  logger,

  // Use Node types here
  customLogLevel: (
    req: IncomingMessage,
    res: ServerResponse,
    err?: Error,
  ): 'info' | 'warn' | 'error' => {
    const response = res as Response; // cast to Express Response
    if (response.statusCode >= 500 || err) return 'error';
    if (response.statusCode >= 400) return 'warn';
    return 'info';
  },

  customSuccessMessage: (req: IncomingMessage, res: ServerResponse): string => {
    const request = req as Request; // cast to Express Request
    const response = res as Response; // cast to Express Response
    return `${request.method} ${request.url} ${response.statusCode}`;
  },

  serializers: {
    req: (req: IncomingMessage) => {
      const request = req as Request;
      return `${request.method} ${request.url}`;
    },
    res: (res: ServerResponse & { responseTime?: number }) =>
      `${res.statusCode} ${res.responseTime ?? 0}ms`,
  },
} as unknown as PinoHttpOptions); // cast to bypass TS mismatch
