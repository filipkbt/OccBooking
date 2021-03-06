﻿using System;
using System.Collections.Generic;
using System.Text;
using OccBooking.Application.DTOs;
using OccBooking.Common.Types;

namespace OccBooking.Application.Queries
{
    public class GetPlacesQuery : IQuery<IEnumerable<PlaceDto>>
    {
        public GetPlacesQuery(PlaceFilterDto placeFilterDto)
        {
            PlaceFilter = placeFilterDto;
        }
        public PlaceFilterDto PlaceFilter { get; }
    }
}
