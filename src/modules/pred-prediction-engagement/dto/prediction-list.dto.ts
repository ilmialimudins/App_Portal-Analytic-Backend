export class PredictionListDTO {
  id: number;
  d_factorid: number;
  factor_shortname: string;
  d_engagementid: number;
  engagement: string;
  demography: string;
  coefficients: number;
  coefficients_type: string;
  prediction_before: number;
  prediction_after: null | number;
}
