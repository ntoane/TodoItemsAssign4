namespace TodoApp.API.Helpers
{
    public class ItemParams
    {
        public string UserName { get; set; }
        public bool Overdue { get; set; } = false;

    }
}