using Boykot.Models.Request;
using Boykot.Models.Response;
using Boykot.Models.Db;

namespace Boykot.Interfaces {

    public interface IBoykotService
    {
        public Task<QueryBarcodeResponse> QueryBarcode(QueryBarcodeRequest request);
        public Task<List<Tag>> GetTags();
    }
}
