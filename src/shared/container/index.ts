import "reflect-metadata";

import "../container/providers"; // import from providers

import { container } from "tsyringe";
import { UsersAddressRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersAddressRepository";
import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersAddressRepository } from "../../modules/accounts/repositories/IUsersAddressRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../modules/accounts/repositories/IUsersTokensRepository";
import { CoffeesRepository } from "../../modules/coffees/infra/typeorm/repositories/CoffeesRepository";
import { SpecificationsRepository } from "../../modules/coffees/infra/typeorm/repositories/SpecificationsRepository";
import { ICoffeesRepository } from "../../modules/coffees/repositories/interfaces/ICoffeesRepository";
import { ISpecificationsRepository } from "../../modules/coffees/repositories/interfaces/ISpecificationsRepository";
import { PurchasesRepository } from "../../modules/purchases/infra/typeorm/repositories/PurchasesRepository";
import { IPurchasesRepository } from "../../modules/purchases/repositories/interfaces/IPurchasesRepository";

container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<ICoffeesRepository>("CoffeesRepository", CoffeesRepository);

container.registerSingleton<IPurchasesRepository>(
  "PurchasesRepository",
  PurchasesRepository
);

container.registerSingleton<IUsersAddressRepository>(
  "UsersAddressRepository",
  UsersAddressRepository
);
