import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

function toCamel(o) {
  let newO, origKey, newKey, value;
  if (o instanceof Array) {
    return o.map(function (value) {
      if (typeof value === 'object') {
        value = toCamel(value);
      }
      return value;
    });
  } else {
    newO = {};
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (
          origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey
        ).toString();
        value = o[origKey];
        if (
          value instanceof Array ||
          (value !== null && value.constructor === Object)
        ) {
          value = toCamel(value);
        }
        newO[newKey] = value;
      }
    }
  }
  return newO;
}

@Injectable()
export class RequestTransformPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(body: any, metadata: ArgumentMetadata): any {
    if (
      metadata.type === 'body' &&
      (typeof body === 'object' || Array.isArray(body))
    ) {
      return toCamel(body);
    }

    return body;
  }
}
