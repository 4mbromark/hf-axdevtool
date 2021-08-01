import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './interceptor/logger.interceptor';

@Module({
    imports: [
    ],
    providers: [
        {
        provide: APP_INTERCEPTOR,
        useClass: LoggerInterceptor
      }
    ],
    exports: [
    ]
})
export class HighFiveLoggerModule { }
