namespace TodoApp.API.Helpers
{
    public class ItemParams
    {
        private const int MaxPageSize = 10;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

        public string UserName { get; set; }
        public bool Overdue { get; set; } = false;

    }
}