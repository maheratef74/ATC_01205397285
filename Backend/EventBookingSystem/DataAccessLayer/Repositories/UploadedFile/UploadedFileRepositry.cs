using DataAccessLayer.DbContext;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories.UploadedFile;
using DataAccessLayer.Entities;
public class UploadedFileRepositry : IUploadedFileRepositry
{
    private readonly AppDbContext _dbContext;

    public UploadedFileRepositry(AppDbContext appDbContext)
    {
        _dbContext = appDbContext;
    }

    public async Task<List<UploadedFile>> GetAllFiles()
    {
        return await _dbContext.UploadedFiles.ToListAsync();
    }

    public async Task<UploadedFile> GetFileByName(string FileName)
    {
        return await _dbContext.UploadedFiles
            .FirstOrDefaultAsync(file => file.StoredFileName == FileName);
    }

    public async Task AddFile(UploadedFile UploadedFile)
    {
        await _dbContext.UploadedFiles.AddAsync(UploadedFile);
    }

    public bool IsFileExists(string FileName)
    {
        return _dbContext.UploadedFiles.Any(file => file.FileName == FileName);
    }

    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }
}