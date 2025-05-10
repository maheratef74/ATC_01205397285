namespace DataAccessLayer.Repositories.UploadedFile;
using DataAccessLayer.Entities;
public interface IUploadedFileRepositry
{
    Task<List<UploadedFile>> GetAllFiles();
    Task<UploadedFile> GetFileByName(string FileName);
    Task AddFile(UploadedFile UploadedFile);
    bool IsFileExists(string FileName);
    Task SaveChangesAsync();
}