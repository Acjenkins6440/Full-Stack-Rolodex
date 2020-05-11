using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AspNetCore.Controllers
{
  [Route("api/[controller]")]
  [Authorize]
  [ApiController]
  public class UsersController : ControllerBase
  {
    private readonly ApplicationDbContext _dbContext;

    public UsersController(ApplicationDbContext dbContext)
    {
      _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<List<User>>> Get()
    {
      return await _dbContext.Users.ToListAsync();
    }

    [HttpPost]
    public async Task<User> Post(User model)
    {
      await _dbContext.AddAsync(model);

      await _dbContext.SaveChangesAsync();

      return model;
    }
    [HttpPut("{id}")]
    public async Task<ActionResult> Put(string id, User model)
    {
      var exists = await _dbContext.Users.AnyAsync(user => user.Id == id);
      if (!exists)
      {
        return NotFound();
      }
      _dbContext.Users.Update(model);

      await _dbContext.SaveChangesAsync();

      return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(string id)
    {
      var user = await _dbContext.Users.FindAsync(id);

      _dbContext.Users.Remove(user);

      await _dbContext.SaveChangesAsync();

      return Ok();
    }
  }
}