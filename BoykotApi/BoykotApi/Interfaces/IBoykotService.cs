using Boykot.Models.Request;
using Boykot.Models.Response;

namespace Boykot.Interfaces {

    public interface IBoykotService
    {
        public Task<QueryBarcodeResponse> QueryBarcode(QueryBarcodeRequest request);
    }
}
