﻿using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using OccBooking.Application.DTOs;
using OccBooking.Domain.Entities;

namespace OccBooking.Application.Mappings.Profiles
{
    public class HallProfile : Profile
    {
        public HallProfile()
        {
            CreateMap<Hall, HallDto>();
            CreateMap<Hall, ExtendedHallDto>()
                .ForMember(dest => dest.PlaceId, opt => opt.MapFrom(src => src.Place.Id));
        }
    }
}