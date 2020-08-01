using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TodoApp.API.Helpers;
using TodoApp.API.Models;

namespace TodoApp.API.Data
{
    public class TodoRepository : ITodoRepository
    {
        private readonly DataContext _context;
        public TodoRepository(DataContext context)
        {
            this._context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<PagedList<TodoItem>> GetItems(ItemParams itemParams)
        {
            // If overdue is true, i.e retrive only items overdue
            if(itemParams.Overdue) {
                // item is ovedue if and only if due date < now and is complete = false
                var todoItems1 = _context.TodoItems.Where(i => i.UserName == itemParams.UserName && (i.DueDate < DateTime.Now && i.IsComplete == false));
                return await PagedList<TodoItem>.CreateAsync(todoItems1, itemParams.PageNumber, itemParams.PageSize);
            }
            // get all items as per user
            var todoItems2 =  _context.TodoItems.Where(i => i.UserName == itemParams.UserName);
            return await PagedList<TodoItem>.CreateAsync(todoItems2, itemParams.PageNumber, itemParams.PageSize);
        }

        public async Task<TodoItem> GetItem(string UserName, int id)
        {
            // return TodoItem that matches the id and the logged UserName
            return await _context.TodoItems.FirstOrDefaultAsync(i => i.Id == id && i.UserName == UserName);
        }


    }
}