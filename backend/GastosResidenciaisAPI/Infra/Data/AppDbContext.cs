using GastosResidenciaisAPI.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciaisAPI.Infra.Data
{
    /// <summary>
    /// DbContext responsável pelo acesso ao banco de dados da aplicação.
    /// Centraliza o mapeamento das entidades do domínio.
    /// </summary>
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
    }
}
