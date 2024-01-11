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
import { toast } from "sonner";
import * as z from "zod";

const SignUp = ({
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
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signUpMutation = api.user.create.useMutation({
    onSuccess: (data, _variables, _context) => {
      if (data) {
        toast("User successfully created..!", {
          position: "top-right",
          duration: 1500,
        });
        router.replace("/auth/sign-in");
      }
    },
    onError: (error) => {
      toast(error.message, { position: "top-right", duration: 1500 });
    },
  });

  const router = useRouter();

  const onSubmit = async (
    values: z.infer<typeof RegistrationValidationSchema>,
  ) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const { confirmPassword, ...rest } = values;

    signUpMutation.mutate({
      ...rest,
    });
  };

  const handleSocialLogin = async (
    authkey: LiteralUnion<BuiltInProviderType, string>,
  ) => {
    const signInData = await signIn(authkey, {
      callbackUrl: "/",
      redirect: true,
    });

    if (signInData?.error !== null && signInData?.error) {
      toast(signInData?.error, { position: "top-right", duration: 1500 });
    }
  };

  const _renderFormByProviders = () => {
    if (providers !== null && providers) {
      return Object.keys(providers).map(
        (authkey: LiteralUnion<BuiltInProviderType, string>, index) => {
          switch (authkey) {
            case "credentials":
              return (
                <Form {...form} key={authkey}>
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

                    <Button
                      disabled={signUpMutation.isLoading}
                      type="submit"
                      className="bg-primary text-white"
                    >
                      Submit
                    </Button>

                    <Link
                      href={"/auth/sign-in"}
                      replace
                      className="text-md flex w-fit gap-2 text-slate-700 max-md:text-sm"
                    >
                      Already have an account?&nbsp;
                      <p className="text-md text-primary">Sign in</p>
                    </Link>
                  </form>

                  <div className="my-4 flex flex-row items-center gap-2">
                    <div className="flex h-[0.5px] w-full bg-dark-1" />
                    <p className="text-md text-slate-700">OR</p>
                    <div className="flex h-[0.5px] w-full bg-dark-1" />
                  </div>
                </Form>
              );

            case "discord":
              return (
                <Button
                  key={authkey}
                  disabled={signUpMutation.isLoading}
                  className="flex gap-5 bg-dark-1 text-light-1 hover:bg-gray-800"
                  onClick={() => handleSocialLogin("discord")}
                >
                  <Image
                    alt="Discord Logo"
                    src={"/assets/discord.png"}
                    width={20}
                    height={20}
                  />
                  Sign in with Discord
                </Button>
              );

            default:
              return <></>;
          }
        },
      );
    }
  };

  return (
    <div className="no-scrollbar flex h-[32em] w-[360px] flex-col justify-between overflow-auto rounded-xl bg-white px-11 py-10">
      <div className="flex flex-col justify-start self-start">
        <p className="text-pretty text-xl text-dark-1">Sign up</p>
        <p className="text-sm text-slate-600">
          to continue to this application
        </p>
      </div>

      {_renderFormByProviders()}
    </div>
  );
};

export default SignUp;
