using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using TodoApp.API.Models;

namespace TodoApp.API.Data
{
    public class Seed {
        public static void SeedUsers (UserManager<IdentityUser> userManager) {
            if (!userManager.Users.Any ()) {
                var userData = System.IO.File.ReadAllText ("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<IdentityUser>> (userData);

                foreach (var user in users) {
                    userManager.CreateAsync (user, "password").Wait ();
                }
            }
        }

        public static void SeedTodoItems (DataContext context) {
            if (!context.TodoItems.Any()) {
                var userData = System.IO.File.ReadAllText ("Data/TodoItemsSeedData.json");
                var todoItems = JsonConvert.DeserializeObject<List<TodoItem>> (userData);

                foreach (var todoItem in todoItems) {
                    todoItem.Task = todoItem.Task;
                    todoItem.IsComplete = todoItem.IsComplete;
                    todoItem.DueDate = todoItem.DueDate;
                    todoItem.UserName = todoItem.UserName;

                    context.TodoItems.Add(todoItem);
                }

                context.SaveChanges();
            }
        }
    }
}