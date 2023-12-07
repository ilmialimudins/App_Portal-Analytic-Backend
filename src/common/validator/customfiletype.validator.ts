import { FileValidator } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';

export interface IFileType {
  fileType: string[];
}

export class CustomUploadFileValidator extends FileValidator {
  private _allowedMimeType: string[];

  constructor(protected readonly validationOptions: IFileType) {
    super(validationOptions);
    this._allowedMimeType = this.validationOptions.fileType;
  }

  public isValid(file: IFile): boolean | Promise<boolean> {
    console.log('get log validation');
    return this._allowedMimeType.includes(file.mimetype);
  }

  public buildErrorMessage(): string {
    return `Upload not allowed. Upload only files of type: ${this._allowedMimeType.join(
      ', ',
    )}`;
  }
}
