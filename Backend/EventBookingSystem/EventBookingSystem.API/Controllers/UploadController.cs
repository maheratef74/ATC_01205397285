using BusinessLogicLayer.Services.FileService;
using BusinessLogicLayer.Services.ResponseService;
using BusinessLogicLayer.Shared;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.UploadedFile;
using EventBookingSystem.API.Models.Upload;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.Localization;

namespace EventBookingSystem.API.Controllers;

[EnableRateLimiting("ApiPolicy")]
[Authorize(AuthenticationSchemes = "Bearer")]
[Route("api/upload")]
[ApiController]
public class UploadController : ControllerBase
{
    private readonly IResponseService _responseService;
    private readonly IUploadedFileRepositry _uploadedFileRepositry;
    private readonly IFileService _fileService;
    private readonly IStringLocalizer<UploadController> _localizer;
    private readonly IWebHostEnvironment _webHostEnvironment;
    
    public UploadController(IResponseService responseService, IUploadedFileRepositry uploadedFileRepositry, IFileService fileService, IStringLocalizer<UploadController> localizer, IWebHostEnvironment webHostEnvironment)
    {
        _responseService = responseService;
        _uploadedFileRepositry = uploadedFileRepositry;
        _fileService = fileService;
        _localizer = localizer;
        _webHostEnvironment = webHostEnvironment;
    }
    
    [Authorize(Roles = Roles.Admin)]
    [HttpPost]
    public async Task<IActionResult> UploadFile(UploadFileRequest request)
    {
        var uploadedFile = await _fileService.UploadFile(request.formFile);
        await _uploadedFileRepositry.AddFile(uploadedFile);
        await _uploadedFileRepositry.SaveChangesAsync();
        return _responseService.CreateResponse(Result<UploadedFile>.Success(uploadedFile));
    }

    [HttpGet]
    [Route("{fileName}")]
    public async Task<IActionResult> GetFile([FromRoute] string fileName)
    {
        var (stream, contentType, downloadName, errorKey) = await _fileService.GetFileAsync(fileName);

        if (errorKey != null)
        {
            return errorKey switch
            {
                "InvalidFileName" => BadRequest(_localizer[errorKey]),
                _ => NotFound(_localizer[errorKey])
            };
        }

        var fileUrl = $"{Request.Scheme}://{Request.Host}/Uploads/{fileName}";
        return Ok(new { url = fileUrl });
    }
}
