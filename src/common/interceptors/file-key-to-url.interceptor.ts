import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { storageConfig } from '../configs/storage.config';

@Injectable()
export class FileKeyToUrlInterceptor implements NestInterceptor<any, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((responseBody) => {
        // response payload body's main data is always in it's first parameter
        const firstKey = Object.keys(responseBody)[0];
        const data = responseBody[firstKey];

        const recursiveToLookForUrlParams = (
          responseDataParameterValueToProcess: unknown,
        ) => {
          if (Array.isArray(responseDataParameterValueToProcess)) {
            return responseDataParameterValueToProcess.map((item) =>
              recursiveToLookForUrlParams(item),
            );
          }

          if (typeof responseDataParameterValueToProcess === 'object') {
            for (let key in responseDataParameterValueToProcess) {
              if (
                this.checkIfParameterIsObject(
                  responseDataParameterValueToProcess,
                  key,
                )
              ) {
                responseDataParameterValueToProcess[key] =
                  recursiveToLookForUrlParams(
                    responseDataParameterValueToProcess[key],
                  );
              }

              if (
                responseDataParameterValueToProcess[key] &&
                key.endsWith('url')
              ) {
                responseDataParameterValueToProcess[
                  key
                ] = `${storageConfig.awsS3BucketUrl}/${responseDataParameterValueToProcess[key]}.webp`;
              }
            }

            return responseDataParameterValueToProcess;
          }
        };

        const processedData = recursiveToLookForUrlParams(data);
        responseBody[firstKey] = processedData;

        return responseBody;
      }),
    );
  }

  checkIfParameterIsObject(source: object, key: string): boolean {
    return source[key] && typeof source[key] === 'object';
  }
}
