import { All, Res } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import * as path from 'path';
import { Response } from 'express';

@Controller('/*')
export class AppController {

  @All()
  redirectToAngular(@Res() res: Response) {
    const ANGULAR = process.env.ANGULAR;

    res.sendFile(path.resolve(ANGULAR + '/index.html'));
  }
}
