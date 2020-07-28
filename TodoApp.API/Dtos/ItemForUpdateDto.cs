using System;

namespace TodoApp.API.Dtos
{
    public class ItemForUpdateDto
    {
        public string Task { get; set; }
        public bool IsComplete { get; set; }
        public DateTime DueDate { get; set; }
    }
}