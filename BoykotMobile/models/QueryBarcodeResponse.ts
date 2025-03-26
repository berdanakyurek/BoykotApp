class QueryBarcodeResponse {
  boykot: boolean = false;

  companyName?: string;

  barcodeNumber?: string;

  tags: TagDTO[] = [];
}
export default QueryBarcodeResponse;
