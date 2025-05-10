using BusinessLogicLayer.Shared;

namespace BusinessLogicLayer.Services.ResponseService;
using System;
using Microsoft.AspNetCore.Mvc;

public interface IResponseService
{
    IActionResult CreateResponse<T>(Result<T> result);
    IActionResult CreateResponse<T>(PagedResult<T> result);
}