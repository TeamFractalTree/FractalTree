namespace FractalTree.Backend.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Load Environment Variables
            DotNetEnv.Env.Load();

            if (!Directory.Exists("/home/app/scans"))
            {
                Directory.CreateDirectory("/home/app/scans");
            }

            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            var app = builder.Build();

            // Configure the HTTP request pipeline.

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
