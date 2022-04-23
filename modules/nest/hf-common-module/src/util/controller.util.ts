import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Response } from 'express';

export class HighFiveControllerUtil {

    public static manageResponse(o: any, res: Response, logger: Logger, message: string): void {
        res.status(HttpStatus.OK).send(o);
        logger.log(message);
    }

    public static manageEmptyResponse(res: Response, logger: Logger, message: string): void {
        res.status(HttpStatus.OK).send();
        logger.log(message);
    }

    public static manageResponseOrFail(o: any, res: Response, logger: Logger, message: string): void {
        const httpStatus = o ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR;
        res.status(httpStatus).send(o);
        logger.log(message);
    }

    public static manageUnhandledException(e: Error, res: Response, logger: Logger, message: string): void {
        logger.error(e);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
        logger.log(message);
    }
}