using System.Net;
using BusinessLogicLayer.Shared;
using Microsoft.AspNetCore.Mvc;

namespace BusinessLogicLayer.Services.ResponseService;

public class ResponseService : IResponseService
{
    public IActionResult CreateResponse<T>(Result<T> result)
    {
        if(result.IsSuccess){
            if(result.Message != string.Empty){
                return new OkObjectResult(new { message = result.Message });
            }else if(result.Token != string.Empty && result.Data != null){
                return new OkObjectResult(new { token = result.Token , data = result.Data});
            }else if(result.Token != string.Empty){
                return new OkObjectResult(new { token = result.Token });
            }else if(result.Data != null){
                return new OkObjectResult(new { data = result.Data });
            }
        }

        var error = new { message = result.Message };
        switch(result.StatusCode){
            case HttpStatusCode.UnprocessableEntity:
                return new UnprocessableEntityObjectResult(error);
            case HttpStatusCode.BadRequest:
                return new BadRequestObjectResult(error);
            case HttpStatusCode.Unauthorized:
              //  return new UnauthorizedObjectResult(error);
            default:
                return new BadRequestObjectResult(error);
        }
    }
    private class Meta {
        public int TotalItems { get; set; }
        public int PageSize { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
       
    }
    private Meta GetMeta<T> (PagedResult<T> result){
        return new Meta(){
            TotalItems = result.TotalItems,
            PageSize = result.PageSize,
            CurrentPage = result.Page,
            TotalPages = result.TotalPages,
        };
    }
    public IActionResult CreateResponse<T>(PagedResult<T> result)
    {
        return new OkObjectResult(new {Data = result.Items , Meta = GetMeta(result)});
    }
}