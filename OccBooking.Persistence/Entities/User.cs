﻿using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using OccBooking.Domain.Entities;

namespace OccBooking.Persistence.Entities
{
    public class User : IdentityUser
    {
        public User(Owner owner, string userName)
        {
            Owner = owner;
            UserName = userName;
        }

        private User()
        {
        }

        public Owner Owner { get; private set; }
    }
}