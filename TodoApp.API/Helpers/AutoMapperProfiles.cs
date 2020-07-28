using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using TodoApp.API.Dtos;
using TodoApp.API.Models;

namespace TodoApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {

            CreateMap<UserForRegisterDto, IdentityUser>();
            CreateMap<UserForLoginDto, IdentityUser>();
            CreateMap<IdentityUser, UserForReturnDto>();
            
            CreateMap<TodoItem, ItemForListDto>();
            CreateMap<ItemForCreationDto, TodoItem>();
            CreateMap<TodoItem, ItemToReturnDto>();
            CreateMap<ItemForUpdateDto, TodoItem> ();
        }
    }
}