using System;

namespace TodoApp.API.Models
{
    public class TodoItem
    {
        public int Id { get; set; }
        public string Task { get; set; }
        public bool IsComplete { get; set; }
        public DateTime DueDate { get; set; }
        public string UserName { get; set; }
    }
}