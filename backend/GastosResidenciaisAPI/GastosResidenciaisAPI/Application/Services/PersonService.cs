using GastosResidenciaisAPI.Application.DTOs;
using GastosResidenciaisAPI.Application.Exceptions;
using GastosResidenciaisAPI.Domain.Entities;
using GastosResidenciaisAPI.Infra.Data;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciaisAPI.Application.Services
{
    /// <summary>
    /// Serviço responsável por encapsular todas as regras de negócio
    /// relacionadas à entidade Person (Pessoa).
    /// </summary>
    public class PersonService
    {
        public readonly AppDbContext _context;

        public PersonService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Cria uma nova pessoa no sistema.
        /// </summary>
        public async Task<PersonDTO> CreateAsync(CreatePersonDTO dto)
        {
            if (dto.Age < 0)
                throw new ValidationException("A idade deve ser um número positivo.");

            var person = new Person
            {
                Name = dto.Name,
                Age = dto.Age,
            };

            _context.Persons.Add(person);
            await _context.SaveChangesAsync();

            return new PersonDTO
            {
                Id = person.Id,
                Name = person.Name,
                Age = person.Age,
            };
        }

        /// <summary>
        /// Retorna todas as pessoas cadastradas.
        /// </summary>
        public async Task<List<PersonDTO>> GetAllAsync()
        {
            return await _context.Persons
                .AsNoTracking()
                .Select(p => new PersonDTO
                {
                    Id = p.Id,
                    Name = p.Name,
                    Age = p.Age,
                })
                .ToListAsync();
        }

        /// <summary>
        /// Retorna uma pessoa cadastrada, pelo seu id.
        /// </summary>
        public async Task<PersonDTO> GetByIdAsync(int personId)
        {
            /// Se person retornar nulo, joga uma exceção.
            var person = await _context.Persons
                .FirstOrDefaultAsync(p => p.Id == personId) ??
                    throw new ValidationException("Pessoa não encontrada.");

            return new PersonDTO
            {
                Id = person.Id,
                Name = person.Name,
                Age = person.Age,
            };
        }

        /// <summary>
        /// Remove uma pessoa do sistema.
        /// 
        /// IMPORTANTE:
        /// As transações associadas serão removidas automaticamente
        /// devido à configuração de cascade delete no banco de dados.
        /// </summary>
        public async Task DeleteAsync(int personId)
        {
            /// Se person retornar nulo, joga uma exceção.
            var person = await _context.Persons
                .FirstOrDefaultAsync(p => p.Id == personId) ?? 
                    throw new ValidationException("Pessoa não encontrada.");

            _context.Persons.Remove(person);
            await _context.SaveChangesAsync();
        }

    }
}
