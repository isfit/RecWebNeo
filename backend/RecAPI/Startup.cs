using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using HotChocolate;
using HotChocolate.AspNetCore;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;

using RecAPI.Queries;
using RecAPI.Mutations;
using RecAPI.Models;
using RecAPI.Repositories;
using RecAPI.Database;

namespace RecAPI
{
    public class Startup
    {

        private readonly IConfiguration Configuration;
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            // Database connection MongoDB
            services.Configure<RecWebDatabaseSettings>(
                Configuration.GetSection(nameof(RecWebDatabaseSettings)));

            services.AddSingleton<IRecWebDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<RecWebDatabaseSettings>>().Value);
            

            // Add repositories to service
            services.AddSingleton<IPositionRepository, PositionRepository>();
            services.AddSingleton<ITeamRepository, TeamRepository>();
            
            // GraphQL Schema
            services.AddGraphQL(sp => SchemaBuilder.New()
                .AddServices(sp)
                .AddQueryType(d => d.Name("Query"))
                .AddMutationType(d => d.Name("Mutation"))
                // Add Query types
                .AddType<PositionQueries>()
                .AddType<TeamQueries>()
                .AddType<BaseQueries>()
                // Add mutations
                .AddType<PositionMutations>()
                .AddType<TeamMutations>()
                // Add Model type
                .AddType<Position>()
                .AddType<Team>()
                .Create()
            );
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseGraphQL();
            app.UsePlayground();
        }
    }
}
