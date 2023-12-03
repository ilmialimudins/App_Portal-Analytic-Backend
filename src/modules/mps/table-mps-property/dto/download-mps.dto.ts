import { GetOneProperty } from './table-mps-property.dto';

export class DownloadMPSDTO extends GetOneProperty {}

export class SheetMetadaDTO {
  companyname: string;
  companyid: number;
  locationname: string;
  locationid: number;
}

class GenerateAmountSumDTO {
  colStart: string;
  rowStart: number;
  rowEnd: number;
  colRangeStart: string;
  colRangeEnd: string;
}

class GenerateTotalSumDTO {
  colStart: string;
  colEnd: string;
  rowStart: number;
  rowRangeStart: number;
  rowRangeEnd: number;
}

export class GenerateSummaryDTO {
  amount: GenerateAmountSumDTO;
  total: GenerateTotalSumDTO;
}
