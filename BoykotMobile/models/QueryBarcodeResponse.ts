class QueryBarcodeResponse {
  boykot: boolean = false;

  companyName?: string;

  barcodeNumber?: string;

  boykotTagIds: string[] = [];
}
export default QueryBarcodeResponse;
