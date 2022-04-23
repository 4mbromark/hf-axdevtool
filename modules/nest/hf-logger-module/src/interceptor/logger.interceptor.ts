import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { catchError, tap } from 'rxjs/operators';
import { HighFiveStandardLogPrefix } from "..";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggerInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler) {
        const req = context.switchToHttp().getRequest();
        const { statusCode } = context.switchToHttp().getResponse();
        const { originalUrl, method, params, query, body, connection } = req;

        console.log('');
        this.logger.log(HighFiveStandardLogPrefix.NEW_REQUEST + connection.remoteAddress + ' ' + method + ' -> ' + originalUrl);
        const bodyCopy = JSON.parse(JSON.stringify(body));
        delete bodyCopy['pswd'];
        delete bodyCopy['tk'];

        const bodyJson = JSON.stringify(bodyCopy)
        if (bodyJson !== '{}') {
            this.logger.log(HighFiveStandardLogPrefix.REQUEST_DATA + bodyJson);
        } 

        return next.handle().pipe(
            tap((data) => {
                this.logger.log(HighFiveStandardLogPrefix.RESPONSE_STATUS + statusCode);
            }),
            catchError((error) => {
                this.logger.log(HighFiveStandardLogPrefix.RESPONSE_STATUS + error.status + ' - ' + error.message);
                throw error;
            })
        ); 
    }
}