namespace FractalTree.Backend.API.Types
{
    [Serializable]
    public class Project
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }
        public string Language { get; set; }
        public string Code { get; set; }
        public string Id { get; set; }
        public Dictionary<string, string> Assets { get; set; }
    }
}
