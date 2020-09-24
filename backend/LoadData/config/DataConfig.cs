using System;
using Newtonsoft.Json;

namespace LoadData.Config
{
    [JsonObject("data")]
    public class DataConfig
    {
        [JsonProperty("directory")]
        public string Directory { get; set; }
        [JsonProperty("textExtention")]
        public string TextExtention { get; set; }
    }

    [JsonObject("data1")]
    public class OverviewConfig
    {
        [JsonProperty("directory")]
        public string Directory { get; set; }
        [JsonProperty("textExtention")]
        public string TextExtention { get; set; }
    }

}
