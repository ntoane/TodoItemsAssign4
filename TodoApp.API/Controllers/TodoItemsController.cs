using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TodoApp.API.Data;
using TodoApp.API.Dtos;
using TodoApp.API.Helpers;
using TodoApp.API.Models;

namespace TodoApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ITodoRepository _repo;
        public TodoItemsController(ITodoRepository repo, IMapper mapper)
        {
            this._repo = repo;
            this._mapper = mapper;

        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<IActionResult> GetItems([FromQuery] ItemParams itemParams)
        {
            var UserName = (User.FindFirst(ClaimTypes.NameIdentifier))?.Value;
            if (string.IsNullOrEmpty(UserName))
                return Unauthorized();

            itemParams.UserName = UserName;

            var items = await _repo.GetItems(itemParams);
            var itemsToReturn = _mapper.Map<IEnumerable<ItemForListDto>>(items);

            Response.AddPagination(items.CurrentPage, items.PageSize, items.TotalCount, items.TotalPages);

            return Ok(itemsToReturn);
        }

        // GET: api/TodoItems/overdue
        [HttpGet("[action]")]
        public async Task<IActionResult> Overdue([FromQuery] ItemParams itemParams)
        {
            var UserName = (User.FindFirst(ClaimTypes.NameIdentifier))?.Value;
            if (string.IsNullOrEmpty(UserName))
                return Unauthorized();

            itemParams.UserName = UserName;
            itemParams.Overdue = true;

            var items = await _repo.GetItems(itemParams);
            var itemsToReturn = _mapper.Map<IEnumerable<ItemForListDto>>(items);

            Response.AddPagination(items.CurrentPage, items.PageSize, items.TotalCount, items.TotalPages);

            return Ok(itemsToReturn);
        }

        // GET: api/TodoItems/{id}
        [HttpGet("{id:int}", Name = "GetItem")]
        public async Task<IActionResult> GetItem([FromRoute] int id)
        {
            var UserName = (User.FindFirst(ClaimTypes.NameIdentifier))?.Value;
            if (string.IsNullOrEmpty(UserName))
                return Unauthorized();

            var itemFromRepo = await _repo.GetItem(UserName, id);
            if (itemFromRepo == null)
                return NotFound();
            var itemToReturn = _mapper.Map<ItemToReturnDto>(itemFromRepo);
            return Ok(itemToReturn);
        }

        // POST: api/TodoItems/
        [HttpPost]
        public async Task<IActionResult> PostItem(ItemForCreationDto itemForCreationDto)
        {
            var UserName = (User.FindFirst(ClaimTypes.NameIdentifier))?.Value;
            if (string.IsNullOrEmpty(UserName))
                return Unauthorized();

            itemForCreationDto.UserName = UserName;
            var item = _mapper.Map<TodoItem>(itemForCreationDto);

            _repo.Add(item);

            if (await _repo.SaveAll())
            {
                var itemToReturn = _mapper.Map<ItemToReturnDto>(item);
                return CreatedAtRoute("GetItem",
                    new { id = item.Id }, itemToReturn);

            }

            throw new Exception("Creating the item failed on save");
        }

        // UPDATE: api/TodoItems/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(int id, ItemForUpdateDto itemForUpdateDto)
        {
            var UserName = (User.FindFirst(ClaimTypes.NameIdentifier))?.Value;
            if (string.IsNullOrEmpty(UserName))
                return Unauthorized();

            var itemFromRepo = await _repo.GetItem(UserName, id);
            if (itemFromRepo != null)
            {
                var item = _mapper.Map(itemForUpdateDto, itemFromRepo);
                if (await _repo.SaveAll())
                    return NoContent();

                throw new Exception($"Updating todoitem {id} failed on save");
            }

            return NotFound("Item Not Found");
        }

        // DELETE: api/TodoItems/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var UserName = (User.FindFirst(ClaimTypes.NameIdentifier))?.Value;
            if (string.IsNullOrEmpty(UserName))
                return Unauthorized();

            var itemFromRepo = await _repo.GetItem(UserName, id);

            _repo.Delete(itemFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception("Error on deleting the todo item");

        }
    }
}