﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using OccBooking.Application.Handlers;
using OccBooking.Common.Dispatchers;
using OccBooking.Common.Hanlders;
using OccBooking.Common.Types;
using OccBooking.Persistance.DbContexts;
using Swashbuckle.AspNetCore.Swagger;

namespace OccBooking.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IContainer Container { get; set; }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddDbContext<OccBookingDbContext>(opt =>
                opt.UseSqlServer(Configuration.GetConnectionString("Connection")));

            services.ConfigureAuthentication(Configuration,
                new SymmetricSecurityKey(Encoding.ASCII.GetBytes("HAS TO BE CHANGED")));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "OccBooking", Version = "v1" });
            });

            var builder = new ContainerBuilder();

            builder.Populate(services);

            builder.RegisterCommandHandlers();
            builder.RegisterQueryHandlers();

            builder.RegisterType<Dispatcher>().As<IDispatcher>();

            Container = builder.Build();

            return new AutofacServiceProvider(Container);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "OccBooking");
                c.RoutePrefix = string.Empty;
            });

            app.UseAuthentication();
            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}