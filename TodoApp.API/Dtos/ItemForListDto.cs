using System;

namespace TodoApp.API.Dtos
{
    public class ItemForListDto
    {
        public int Id { get; set; }
        public string Task { get; set; }
        public bool IsComplete { get; set; }
        public DateTime DueDate { get; set; }
    }
}