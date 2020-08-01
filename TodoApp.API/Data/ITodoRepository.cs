using System.Collections.Generic;
using System.Threading.Tasks;
using TodoApp.API.Helpers;
using TodoApp.API.Models;

namespace TodoApp.API.Data
{
     public interface ITodoRepository {
        void Add<T> (T entity) where T : class;
        void Delete<T> (T entity) where T : class;
        Task<bool> SaveAll ();

        Task<PagedList<TodoItem>> GetItems (ItemParams userParams);
        Task<TodoItem> GetItem (string UserName, int id);
    }
}