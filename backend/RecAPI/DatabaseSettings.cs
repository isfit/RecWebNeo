namespace RecAPI.Database
{
    public class RecWebDatabaseSettings : IRecWebDatabaseSettings
    {
        public string PositionCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
    public interface IRecWebDatabaseSettings
    {
        string PositionCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}