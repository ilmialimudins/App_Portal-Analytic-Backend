export class PredictionListDTO {
  id: number;
  factorid: number;
  factor_shortname: string;
  engagementid: number;
  engagement: string;
  demography: string;
  coefficients: number;
  coefficients_type: string;
  prediction_before: number;
  prediction_after: null | number;
}
