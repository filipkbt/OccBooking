﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OccBooking.Application.Commands;
using OccBooking.Application.DTOs;
using OccBooking.Application.Queries;
using OccBooking.Common.Dispatchers;
using OccBooking.Domain.Enums;

namespace OccBooking.Web.Controllers
{
    [Route("api")]
    public class PlacesController : BaseController
    {
        public PlacesController(IDispatcher dispatcher) : base(dispatcher)
        {
        }

        [HttpGet("places")]
        public async Task<IActionResult> GetPlacesAsync([FromQuery] PlaceFilterDto dto)
        {
            return FromCollection(await QueryAsync(new GetPlacesQuery(dto)));
        }

        [Authorize]
        [HttpGet("{ownerId}/places")]
        public async Task<IActionResult> GetOwnerPlacesAsync(string ownerId)
        {
            return FromCollection(await QueryAsync(new GetOwnerPlacesQuery(new Guid(ownerId))));
        }


        [HttpGet("places/{placeId}")]
        public async Task<IActionResult> GetPlaceAsync(string placeId)
        {
            return FromSingle(await QueryAsync(new GetPlaceQuery(new Guid(placeId))));
        }

        [Authorize]
        [HttpPost("{ownerId}/places")]
        public async Task<IActionResult> CreatePlaceAsync(string ownerId, PlaceForCreationDto model)
        {
            return FromCreation(await CommandAsync(new CreatePlaceCommand(model.Name, model.HasRooms,
                model.CostPerPerson, model.Description, model.Street, model.City, model.ZipCode, model.Province,
                new Guid(ownerId))));
        }

        [Authorize]
        [HttpPost("places/{placeId}/additionalOptions")]
        public async Task<IActionResult> AddOptionsForPlaceAsync(string placeId,
            [FromBody] AdditionalOptionForCreationDto dto)
        {
            return FromCreation(await CommandAsync(new AddOptionCommand(dto.Name, dto.Cost, new Guid(placeId))));
        }

        [Authorize]
        [HttpPut("places/{placeId}/occasionTypes/{occasionType}/allow")]
        public async Task<IActionResult> AllowOccasionType(string placeId, int occasionType)
        {
            return FromUpdate(await CommandAsync(new AllowOccasionTypeCommand(new Guid(placeId), (OccasionType)occasionType)));
        }

        [Authorize]
        [HttpPut("places/{placeId}/occasionTypes/{occasionType}/disallow")]
        public async Task<IActionResult> DisallowOccasionType(string placeId, int occasionType)
        {
            return FromUpdate(await CommandAsync(new DisallowOccasionTypeCommand(new Guid(placeId), (OccasionType)occasionType)));
        }
    }
}