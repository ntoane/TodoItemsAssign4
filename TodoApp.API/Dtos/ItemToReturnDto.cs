using System;

namespace TodoApp.API.Dtos
{
    public class ItemToReturnDto
    {
        public int Id { get; set; }
        public string Task { get; set; }
        public bool IsComplete { get; set; }
        public DateTime DueDate { get; set; }
    }
}