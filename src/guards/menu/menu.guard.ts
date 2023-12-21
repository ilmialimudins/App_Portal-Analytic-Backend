import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class MenuGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const menuCodes = this.reflector.get<string[]>(
      'menucodes',
      context.getHandler(),
    );

    console.log('menuCodes', menuCodes);

    return true;
  }
}
