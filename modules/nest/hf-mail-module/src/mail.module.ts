import { HighFiveMailSenderClient } from './client/sender.client';
import { HighFiveMailSenderService } from './service/sender.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HighFiveEnvironmentModule } from 'hf-env-module';

@Module({
    imports: [
        HighFiveEnvironmentModule,

        MailerModule.forRoot({
            transport: {
                host: process.env.MAIL_HOST,
                port: +process.env.MAIL_PORT,
                secure: true,
                auth: {
                    user: process.env.MAIL_AUTH_USERNAME,
                    pass: process.env.MAIL_AUTH_PASSWORD,
                }
            },
        })
    ],
    providers: [
        HighFiveMailSenderService,

        HighFiveMailSenderClient
    ],
    exports: [
        HighFiveMailSenderService
    ]
})
export class HighFiveMailSenderModule {}
