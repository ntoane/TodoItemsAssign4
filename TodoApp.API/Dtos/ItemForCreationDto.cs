using System;

namespace TodoApp.API.Dtos
{
    public class ItemForCreationDto
    {
        public string Task { get; set; }
        public bool IsComplete { get; set; } = false;
        public DateTime DueDate { get; set; }
        public string UserName { get; set; }
    }
}