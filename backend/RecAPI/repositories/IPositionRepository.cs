using System.Collections.Generic;
using RecAPI.Models;

namespace RecAPI.Repositories
{
    public interface IPositionRepository
    {
        void AddPosition(string Name, string Description);
        IEnumerable<Position> GetPositions();
    }
}