namespace RecAPI.Database
{
    public class RecWebDatabaseSettings : IRecWebDatabaseSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string PositionCollectionName { get; set; }
        public string TeamCollectionName { get; set; }
    }
    public interface IRecWebDatabaseSettings
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
        string PositionCollectionName { get; set; }
        string TeamCollectionName { get; set; }
    }
}