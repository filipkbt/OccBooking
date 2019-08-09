﻿using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OccBooking.Domain.Entities;

namespace OccBooking.Persistance.Configurations
{
    public class HallJoinConfiguration : IEntityTypeConfiguration<HallJoin>
    {
        public void Configure(EntityTypeBuilder<HallJoin> builder)
        {
            builder.HasOne(hj => hj.FirstHall).WithMany(h => h.PossibleJoins);
            builder.HasOne(hj => hj.SecondHall).WithMany(h => h.PossibleJoins);
        }
    }
}
