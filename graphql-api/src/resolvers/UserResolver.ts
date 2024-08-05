import type { Context } from "@/types/Context";
import * as argon2 from "argon2";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../entities/User";

dotenv.config();
const { COOKIE_TTL, JWT_SECRET } = process.env;

@InputType()
class NewUserInput implements Partial<User> {
  @Field()
  mail: string;

  @Field()
  password: string;

  @Field()
  name: string;
}

function setCookie(ctx: Context, key: string, value: string) {
  if (!COOKIE_TTL) throw new Error("Missing TTL conf key!");
  const myDate = new Date();
  const expiryTStamp = myDate.getTime() + Number(COOKIE_TTL);
  myDate.setTime(expiryTStamp);
  ctx.res.setHeader(
    "Set-Cookie",
    `${key}=${value};secure;httpOnly;SameSite=Strict;expires=${myDate.toUTCString()}`,
  );
}
function getUserPublicProfile(user: User) {
  return {
    id: user.id,
    name: user.name,
    roles: user.roles,
  };
}
function getUserTokenContent(user: User) {
  return {
    id: user.id,
    roles: user.roles,
    name: user.name,
  };
}

@Resolver(User)
class UserResolver {
  @Query(() => [User])
  async getAllUsers() {
    return (await User.find()).map((user) => ({
      name: user.name,
      id: user.id,
      roles: user.roles,
    }));
  }

  @Mutation(() => String)
  async login(@Arg("data") userData: NewUserInput, @Ctx() context: Context) {
    try {
      if (!JWT_SECRET) throw new Error();
      const user = await User.findOneByOrFail({ mail: userData.mail });

      const isValid = await argon2.verify(
        user.hashedPassword,
        userData.password,
      );
      if (!isValid) throw new Error();

      const token = jwt.sign(getUserTokenContent(user), JWT_SECRET);
      setCookie(context, "token", token);
      return JSON.stringify(getUserPublicProfile(user));
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  @Mutation(() => String)
  async signup(@Arg("data") userData: NewUserInput, @Ctx() context: Context) {
    try {
      if (!JWT_SECRET) throw new Error("Missing JWT secret env variable");

      const hashedPassword = await argon2.hash(userData.password);
      const user = await User.save({
        mail: userData.mail,
        hashedPassword,
        name: userData.name,
      });
      const token = jwt.sign(getUserTokenContent(user), JWT_SECRET);
      setCookie(context, "token", token);
      return JSON.stringify(getUserPublicProfile(user));
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}

export default UserResolver;
