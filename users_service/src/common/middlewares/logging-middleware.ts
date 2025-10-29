import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
	constructor() {}

	use(req: Request, res: Response, next: NextFunction) {
		
      console.log('Middleware...', req.headers, res.body)
			next()
	}
}
