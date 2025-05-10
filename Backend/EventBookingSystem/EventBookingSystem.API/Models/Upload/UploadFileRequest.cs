using System.ComponentModel.DataAnnotations;

namespace EventBookingSystem.API.Models.Upload;

public class UploadFileRequest
{ 
    [Required(ErrorMessage = "FileRequired")]
    [DataType(DataType.Upload, ErrorMessage = "FileUploadTypeInvalid")]
    public IFormFile formFile {get; set;}
}