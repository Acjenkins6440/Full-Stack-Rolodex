using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AspNetCore.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ContactRecordsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public ContactRecordsController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<ContactRecord>>> Get(string userId)
        {
            return await _dbContext.ContactRecords.Where(contact => contact.UserId == userId).ToListAsync();
        }

        [HttpPost]
        public async Task Post(ContactRecord model)
        {
            await _dbContext.AddAsync(model);

            await _dbContext.SaveChangesAsync();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(string id, ContactRecord model)
        {
            var exists = await _dbContext.ContactRecords.AnyAsync(contact => contact.Id == id);
            if(!exists)
            {
                return NotFound();
            }
            _dbContext.ContactRecords.Update(model);

            await _dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var contact = await _dbContext.ContactRecords.FindAsync(id);

            _dbContext.ContactRecords.Remove(contact);

            await _dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}