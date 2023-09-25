using System.Collections.Generic;
using System.Threading.Tasks;
using PlanService.DTOs;
using PlanService.Models;

namespace PlanService.Data;

public interface IStatusPropRepository
{
    public Task<bool> UpdateStatusProps(string userSub, List<StatusItemDto> statusItemDtos);
    public Task<StatusProp> GetStatusPropByUserSub(string userSub);
}