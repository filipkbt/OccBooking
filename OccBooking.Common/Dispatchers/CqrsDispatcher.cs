﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Autofac;
using CSharpFunctionalExtensions;
using OccBooking.Common.Hanlders;
using OccBooking.Common.Types;

namespace OccBooking.Common.Dispatchers
{
    public class CqrsDispatcher : ICqrsDispatcher
    {
        private IComponentContext _context;
        public CqrsDispatcher(IComponentContext context)
        {
            _context = context;
        }
        public async Task<Result> DispatchAsync(ICommand command)
        {
            var handlerType = typeof(ICommandHandler<>)
                .MakeGenericType(command.GetType());

            dynamic handler = _context.Resolve(handlerType);

            return await handler.HandleAsync((dynamic)command);
        }


        public async Task<Result<T>> DispatchAsync<T>(IQuery<T> query)
        {
            var handlerType = typeof(IQueryHandler<,>)
                .MakeGenericType(query.GetType(), typeof(T));

            dynamic handler = _context.Resolve(handlerType);

            return await handler.HandleAsync((dynamic)query);
        }
    }
}
