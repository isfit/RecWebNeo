using System.Collections.Generic;
using RecAPI.Models;

namespace RecAPI.Repositories
{
    public interface IPositionRepository
    {
        IEnumerable<Position> GetPositions();
        IEnumerable<Position> GetPositions(List<string> ids);
        Position GetPosition(string id);
        Position AddPosition(Position position);

        Position UpdatePosition(string id, Position position);
        bool DeletePosition(string id);
    }
}