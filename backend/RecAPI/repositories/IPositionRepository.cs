using System.Collections.Generic;
using RecAPI.Models;

namespace RecAPI.Repositories
{
    public interface IPositionRepository
    {
        IEnumerable<Position> GetPositions();
        Position GetPosition(string Id);
        Position AddPosition(Position position);

        Position UpdatePosition(string Id, Position position);
        bool DeletePosition(string id);
    }
}