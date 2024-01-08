"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegistrationValidationSchema } from "@/lib/validations/RegistrationValidationSchema";
import { api } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { BuiltInProviderType } from "next-auth/providers/index";
import { ClientSafeProvider, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { LiteralUnion, useForm } from "react-hook-form";
import * as z from "zod";

export const SignUp = ({
  providers,
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}): React.ReactNode => {
  const form = useForm<z.infer<typeof RegistrationValidationSchema>>({
    resolver: zodResolver(RegistrationValidationSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = api.user.create.useMutation();

  const router = useRouter();

  const onSubmit = async (
    values: z.infer<typeof RegistrationValidationSchema>,
  ) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const { confirmPassword, ...rest } = values;

    mutation.mutate({
      ...rest,
    });

    router.replace("/auth/sign-in");
  };

  return (
    <div className="no-scrollbar flex h-2/3 flex-col justify-between overflow-auto rounded-xl bg-white px-11 py-10">
      <div className="flex flex-col justify-start self-start">
        <p className="text-pretty text-xl text-dark-1">Sign up</p>
        <p className="text-sm text-slate-600">
          to continue to this application
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 flex flex-col justify-start gap-6"
        >
          <FormField
            required
            name="name"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="text-base-semibold text-dark-1">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      className="input-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            required
            name="username"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="text-base-semibold text-dark-1">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      className="input-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            required
            name="email"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="text-base-semibold text-dark-1">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="input-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            required
            name="password"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="text-base-semibold text-dark-1">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="input-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            required
            name="confirmPassword"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="text-base-semibold text-dark-1">
                    Confirm password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      className="input-focus"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit" className="bg-primary text-white">
            Submit
          </Button>

          <Link
            href={"/auth/sign-in"}
            replace
            className="text-md flex w-fit gap-2 text-slate-700 max-md:text-sm"
          >
            Already have an account?&nbsp;
            <p className="text-primary text-md">Sign in</p>
          </Link>
        </form>
        <div className="my-4 flex flex-row items-center gap-2">
          <div className="flex h-[0.5px] w-full bg-dark-1" />
          <p className="text-md text-slate-700">OR</p>
          <div className="flex h-[0.5px] w-full bg-dark-1" />
        </div>

        <Button
          disabled={mutation.isLoading}
          className="flex gap-5 bg-dark-1 text-light-1 hover:bg-gray-800"
          onClick={() => {
            signIn("discord", {
              callbackUrl: "/",
              redirect: true,
            });
          }}
        >
          <Image
            alt="Discord Logo"
            src={"/assets/discord.png"}
            width={20}
            height={20}
          />
          Sign in with Discord
        </Button>
      </Form>
    </div>
  );
};
