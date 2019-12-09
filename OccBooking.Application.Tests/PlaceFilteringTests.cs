﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using OccBooking.Application.Extensions;
using OccBooking.Domain.Entities;
using OccBooking.Domain.ValueObjects;
using Xunit;

namespace OccBooking.Application.Tests
{
    public class PlaceFilteringTests
    {
        [Fact]
        public void FilteringByDatesShouldWork()
        {
            var address = new Address("Some", "Some", "43-186", "śląskie");
            var place1 = new Place(Guid.NewGuid(), "Some1", true, "", address);
            var place2 = new Place(Guid.NewGuid(), "Some2", true, "", address);
            var place3 = new Place(Guid.NewGuid(), "Some3", true, "", address);
            var place4 = new Place(Guid.NewGuid(), "Some4", true, "", address);
            var place5 = new Place(Guid.NewGuid(), "Some5", true, "", address);

            var hall1 = new Hall(Guid.NewGuid(), "Hall", 100);
            hall1.MakeEmptyReservation(DateTime.Today.Date);
            place1.AddHall(hall1);

            var hall2 = new Hall(Guid.NewGuid(), "Hall", 100);
            place2.MakeEmptyReservation(DateTime.Today.Date);
            place2.AddHall(hall2);

            var hall3 = new Hall(Guid.NewGuid(), "Hall", 100);
            place3.MakeEmptyReservation(DateTime.Today.AddDays(-1).Date);
            place3.AddHall(hall3);

            var hall4 = new Hall(Guid.NewGuid(), "Hall", 100);
            hall4.MakeEmptyReservation(DateTime.Today.AddDays(1).Date);
            place4.AddHall(hall4);

            var places = new List<Place>() {place1, place2, place3, place4, place5};

            var expected = new List<Place>() {place3, place4, place5};
            var actual = places.FilterByDate(null, DateTime.Today.Date);

            Assert.Equal(expected, actual);
        }
    }
}