import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateLeadDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  telephone: string;

  @IsOptional()
  @IsNumber()
  status: number;

  @IsOptional()
  @IsNumber()
  suspectType: number;

  @IsOptional()
  @IsNumber()
  dropSuspectReasonID: number;

  @IsOptional()
  @IsString()
  dropSuspectReasonDescription: string;

  @IsOptional()
  @IsNumber()
  dropProspectReasonID: number;

  @IsOptional()
  @IsString()
  dropProspectReasonDescription: string;

  @IsOptional()
  @IsNumber()
  businessAreaID: number;

  @IsOptional()
  @IsNumber()
  salesmanID: number;

  @IsOptional()
  @IsNumber()
  customerID: number;

  @IsOptional()
  @IsNumber()
  salesSourceID: number;

  @IsOptional()
  @IsNumber()
  title: number;

  @IsOptional()
  @IsNumber()
  documentID: number;

  @IsOptional()
  @IsNumber()
  suspectCustomerID: number;

  @IsOptional()
  @IsString()
  variant: string;

  @IsOptional()
  @IsString()
  timeToCall: string;

  @IsOptional()
  @IsNumber()
  salesSourceCategoryID: number;

  @IsOptional()
  @IsString()
  claimDate: string;

  @IsOptional()
  @IsString()
  lmsLeadNo: string;

  @IsOptional()
  @IsString()
  score: string;

  @IsOptional()
  @IsString()
  notes1: string;

  @IsOptional()
  @IsString()
  notes2: string;

  @IsOptional()
  @IsString()
  notes3: string;

  @IsOptional()
  @IsString()
  program: string;

  @IsOptional()
  @IsString()
  leasingCompany: string;

  @IsOptional()
  @IsString()
  leasingInvoiceDate: string;

  @IsOptional()
  @IsString()
  leasingDueDate: string;

  @IsOptional()
  @IsString()
  sourceCreatedTime: string;

  @IsOptional()
  @IsString()
  distributeTime: string;

  @IsOptional()
  @IsString()
  referenceName: string;

  @IsOptional()
  @IsString()
  referencePhone: string;

  @IsOptional()
  @IsNumber()
  referenceDocumentTypeID: number;

  @IsOptional()
  @IsNumber()
  referenceDocumentID: number;

  @IsOptional()
  @IsBoolean()
  isPreviousSalesman: boolean;

  @IsOptional()
  @IsNumber()
  sourceSystem: number;

  @IsOptional()
  @IsString()
  sourceNo: string;

  @IsOptional()
  @IsNumber()
  lmsAreaID: number;

  @IsOptional()
  @IsNumber()
  materialID: number;

  @IsOptional()
  @IsString()
  variantColorCode: string;

  @IsOptional()
  @IsString()
  idNo: string;

  @IsOptional()
  @IsString()
  paymentMethod: string;

  @IsOptional()
  @IsNumber()
  downpayment: number;

  @IsOptional()
  @IsNumber()
  tenor: number;

  @IsOptional()
  @IsNumber()
  creditInstallment: number;

  @IsOptional()
  @IsString()
  usedVehicleBrand: string;

  @IsOptional()
  @IsString()
  usedVehicleModel: string;

  @IsOptional()
  @IsString()
  usedVehicleColor: string;

  @IsOptional()
  @IsString()
  usedVehicleMileage: string;

  @IsOptional()
  @IsString()
  usedVehicleYear: string;

  @IsOptional()
  @IsString()
  prevName: string;

  @IsOptional()
  @IsString()
  otherCar: string;

  @IsOptional()
  @IsNumber()
  salesSourceDetailID: number;

  @IsOptional()
  @IsBoolean()
  isCustomerRO: boolean;

  @IsOptional()
  @IsString()
  userGroup: string;

  @IsOptional()
  @IsNumber()
  companyCodeID: number;

  @IsOptional()
  @IsString()
  model: string;

  @IsOptional()
  @IsString()
  load: string;

  @IsOptional()
  @IsString()
  loadSize: string;

  @IsOptional()
  @IsString()
  operationalArea: string;

  @IsOptional()
  @IsNumber()
  ownedBrandID: number;

  @IsOptional()
  @IsString()
  ownedType: string;
}
